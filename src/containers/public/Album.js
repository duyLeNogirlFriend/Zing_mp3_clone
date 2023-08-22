import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as apis from '../../apis'
import moment from 'moment/moment'
import { Lists } from '../../components'
import Scrollbars from 'react-custom-scrollbars-2'
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions'

const Album = () => {

  const {title, playlistId} = useParams();
  const [playListData, setPlayListData] = useState({})
  const dispatch =  useDispatch()  


  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await apis.getDetailPlaylist(playlistId)
      if(response.data?.err === 0 ) {
        setPlayListData(response.data?.data)
        dispatch(actions.setPlayList(response?.data?.data?.song?.items))
        
      }
    }

    fetchDetailPlaylist()
  }, [playlistId])

  return (
   

    
    <div  className='flex gap-8 w-full px-[60px]'>
      <div className=' flex-none flex flex-col w-1/4  gap-1 items-center'>
        <img src={playListData?.thumbnailM} className='w-full object-contain rounded-md shadow-lg'/>

        <h3 className='font-bold text-[20px] flex '>{playListData.title}</h3>

        <span className='flex gap-2  text-gray-500 text-sm '>
          <span>Updated: </span>
          <span> {moment.unix(playListData?.contentLastUpdate).format("DD/MM/YYYY")}</span>
        </span>
        <span className='text-gray-500 text-sm items-center flex justify-center'>{playListData.artistsNames}</span>
        <span className='text-gray-500 text-sm '>{`${Math.round(playListData.like) / 1000}K people liked`}</span>
      </div>

      <div className='flex-auto overflow-y-auto h-screen'>
      <Scrollbars style={{width: '100%', height: '80%'}} autoHide>
          <span className=' text-sm '>
            <span className='text-gray-500'>Title: </span>
            <span>{ playListData.sortDescription}</span>
          </span>
          <div>
            <Lists  totalDuration ={playListData?.song?.totalDuration}/>                   
          </div>
      </Scrollbars>
      </div>
    </div>
  )
}

export default Album