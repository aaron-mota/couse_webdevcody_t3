import React from 'react'
import { ImageWrapped } from '../ImageWrapped'
import { Paper } from '@mui/material'
import { Icon } from '@prisma/client'
import { UserBadgeIndicator } from '../UserBadgeIndicator'

interface IconAppProps {
  icon?: Icon,
  imageUrl?: string,
}


const IconApp = ({ icon, imageUrl }: IconAppProps) => {

  // if MOCK IMAGE
  if (imageUrl) {
    return (
      <Paper elevation={4} sx={{p: 0, lineHeight: 0}}>
        <ImageWrapped src={imageUrl} width={200} height={200} />
      </Paper>
    )
  }

  
  // const imageUrl = `https://${env.S3_BUCKET_NAME}.s3.${env.S3_REGION}.amazonaws.com/${icon.id}`
  imageUrl = `https://course-webdevcody-t3-2.s3.us-east-2.amazonaws.com/${icon?.id}` // probably shouldn't be editing props...
  return (
    <Paper elevation={4} sx={{p: 0, lineHeight: 0, position: "relative"}}>
      <ImageWrapped src={imageUrl} alt={icon?.prompt} width={200} height={200} />
      <UserBadgeIndicator userId={icon?.userId} sx={{position:"absolute", top: 4, left: 4}} />
    </Paper>
  )
}

export default IconApp