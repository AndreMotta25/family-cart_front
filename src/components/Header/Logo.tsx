import React from 'react'
import ResponsiveText from '../ResponsiveText/ResponsiveText'

function Logo() {
  return (
    <ResponsiveText
        fontFamily={"'Permanent Marker', cursive"}
        color={"teal.200"}
        flex={1}
        type="heading"
        textAlign={{base:"right", lg: 'left'}}
        pl={"1.125rem"}
      >
        FamilyCart
      </ResponsiveText>
  )
}

export default Logo