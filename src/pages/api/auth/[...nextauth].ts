
import { api } from "@/services/axios";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';

interface ICredentials {
    email: string;
    password: string;
    csrfToken: string;
}

const getUserDetails = async (token: string) => {
    try {
        const userDetails = (await api.get("/user",{headers:{Authorization:`Bearer ${token}`}})).data;
        return userDetails;
    }
    catch(e:any) {
        if(e.response.status === 401) {
            throw new Error("Erro de autenticação")
        }
    }
}

export const authOptions: AuthOptions = {
    session: {
        strategy:'jwt',
        maxAge: 86400 // só funciona se o usuario ficar ocioso.
    },
    providers:[
        CredentialsProvider({
            name:"credentials",
            // Só uso aqui se formos usar o formulario padrão(eu acho ).
            credentials: {
                email: {},
                password: {}
            },
            // é executado só para o provider de credentials
            async authorize(credentials, req)  {
                const {email, password} = credentials as ICredentials;

                const res = await fetch(`http://localhost:3333/sign`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                })
                // //   console.log(await res.json())
                const user = await res.json();

                if (user?.token) {
                    return user
                } 
                throw new Error(user.message)   
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ], 
    // Os consoles feitos aqui, vão ser printados no terminal e não no navegador.
    callbacks: {
        /*
            - Nessa callback podemos decidir se o usuario vai ser permitido logar ou não. 
            
            - Esse pelo jeito vem primeiro que todos, então é aqui que vamos obter o jwt caso não 
              seja pelo credentials.
        */ 
        async signIn ({user: data, account}) {
            /*
                Vamos acessar um endpoint especifico para usarmos providers.
            */ 
            if((account?.type !== 'credentials')) {
                const res = await fetch(`http://localhost:3333/sign_provider?token=${account?.id_token}&provider=${account?.provider}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                const {user, token, message} = await res.json();
                if(res.status === 200) {
                    // aqui pro user só vai ser passado o email, id. o resto vai ser passado no token
                    data.user  = {email: data.email as string, id: user.id as string}; 
                    data.token = token;                
                }
                else {
                    throw new Error(`${message}#${res.status}`)
                    // return false
                }
            }
            return true;

        },
        // Esse só vai ser acionado quando o token for criado. vai ser acionado antes do session
        // é acionado também quando a pagina sofre um reload.
        async jwt ({token,account, user: data, trigger, session}) { // No user vai vir o token.
            /*
                Vamos pegar o token gerado pelo nosso backend e colocar no token gerado pelo next-auth, com a identificação de accessToken.
            */
           // Esse trigger vai ser acionado quando for um update    
            if(trigger === 'update' && session) {
                if(session.user) token = {...token, user: {...token.user, ...session.user}};
                else if(session) token = {...token, ...session};
                console.log(token)
            }
            else if(data) { // first access
                const details = await getUserDetails(data.token);
                const basicDetails = {...data.user, name: details.name || data.name , image: details.image || data.image || ''};
                token = {...token, user:{...basicDetails}, accessToken: data.token, totalNotifications: details.totalNotifications,totalFriends: details.totalFriends,listsSharedTotal: details.listsSharedTotal}
            }
            else { // later access => sincronize the data
                const details = await getUserDetails(token.accessToken);
                if(details) {
                    const basicDetails = {...token.user, name:details.name , image: details.image || token.user.image || ''};
                    token = {...token, user:{...token.user,...basicDetails},
                     totalNotifications: details.totalNotifications, totalFriends: details.totalFriends, listsSharedTotal: details.listsSharedTotal}
                }
            }
            return token
            
        },
        /*
            Esse callback é acionado toda vez que uma sessão é verificada, ou seja, toda vez que o hook useSession é acionado. 
            Certas partes do token não vão ser levadas pro front-end automaticamente, e é nessa callback que vamos levar certas informaçoes pro front.

            Essa função também é executada quando a pagina sofre um reload.
        */ 
        async session ({session, token, user}) {
            // O user só vai ser passado para cá se a strategy for database, caso seja um jwt só o token é passado.   
            // Então temos que colocar os dados do usuario no token.
            session.user = token.user;                                                           
            session.accessToken = token.accessToken;
            session.totalNotifications = token.totalNotifications;
            session.totalFriends = token.totalFriends
            session.listsSharedTotal = token.listsSharedTotal
            return session
        }
    },
    pages: {
        signIn: '/', // pagina index. acredito que seja relativo a pasta pages do next
        error: "/"
    },
}
export default NextAuth(authOptions);

// Acho que toda vez que atualizo a pagina, o tempo de expiração muda,
