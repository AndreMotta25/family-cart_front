import React, { useEffect, useState } from 'react'
import { Modal } from '../Modal'
import { Flex, Grid, Spinner, useDisclosure } from '@chakra-ui/react'
import { ShareTo } from './ShareTo';
import { useAxios } from '@/hooks/useAxios';
import { useSession } from 'next-auth/react';
import { useQuery } from '@/hooks/useQuery';
import { api } from '@/services/axios';

type ModalShareProps = {
    id_list?: string;
    isOpenModalShare: boolean;
    closeModalShare: () => void;
}

interface IFriends {
  id: string;
  email: string;
  name: string;
  url: string
}


const ModalShare = ({closeModalShare, id_list, isOpenModalShare}:ModalShareProps) => {
  const {data: session} = useSession();
  const [loaded, setLoaded] = useState(false);

  const {data: friends, isLoading} = useQuery<IFriends[]>({queryKey: ['friends'], queryFn: async () => {
    setLoaded(true);
    return (await (api.get('/user/friends', {headers: {Authorization: `Bearer ${session?.accessToken}`}}))).data
  },
    enabled: session?.accessToken !== undefined && isOpenModalShare && !loaded,
  })
  return (
    <Modal as={"div"} onSave={() => console.log('save')} isOpen={isOpenModalShare} onClose={closeModalShare} title='Compartilhar'>
        {isLoading && <Flex>
            <Spinner my={0} mx={"auto"} width={'50px'} height={"50px"} color="black"/>
          </Flex>  
        }
        {!isLoading && Array.isArray(friends) &&
        <Grid templateColumns={"repeat(auto-fill, minmax(60px, 1fr))"} gap={'1rem'}> 
            {friends.map((friend) => (<ShareTo key={friend.id} name={friend.name} src={friend.url} id={friend.id} list_id={id_list as string}/>))}
         </Grid>
        }
    </Modal>
  )
}

export default ModalShare
