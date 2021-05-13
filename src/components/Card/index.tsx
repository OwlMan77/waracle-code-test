import './index.css'
import React, { PropsWithoutRef, useState } from 'react'

import * as catAPI from '../../api/cat.api'
import Arrow from '../../assets/arrow_up.svg'
import Error from '../Error'

export interface CardProps {
  imageId: string,
  imageUrl: string,
  favourite: {
      id?: number
  },
  loadedScore: number
}

function Card(props: PropsWithoutRef<CardProps>): JSX.Element {
    const {imageId, loadedScore, imageUrl, favourite} = props;

    const [favouriteId, setFavouriteId] = useState<number | null>(favourite.id ?? null)
    const [score, setScore] = useState(loadedScore);
    const [error, setError] = useState<string | null>()

    
    const onFavourite = async (imageId: string, favouriteId: number | null) => {
        const data = {sub_id: catAPI.subId, image_id: imageId}
    
        if (favouriteId) {
            catAPI.unfavourite(data, `${favouriteId}`)
                .then(() => {
                    setFavouriteId(null)
                    setError(null)
                })
                .catch((e) => {
                    console.error(e)
                    setError('Unable to favourite.')
                })
        } else {
            catAPI.favourite(data)
                .then((data) => {
                    setFavouriteId(data.id)
                    setError(null)
                })
                .catch((e) => {
                    console.error(e)
                    setError('Unable to remove favourite.')
                })
        }
    }

    const onVoteAction = async (imageId: string, value: 0 | 1) => {

        const scoreEffect = !!value ? 1 : -1;

        const data = {sub_id: catAPI.subId, image_id: imageId, value}

        if (!(scoreEffect > 0 && score >= 1) && !(scoreEffect < 0 && score < 1)) {
            catAPI.vote(data)
            .then(() => {
                setScore(score + scoreEffect)
                setError('')
            })
            .catch((e) => {
                console.error(e)
                setError('Unable to cast vote. Your vote was not saved')
            })
        }

    }

    return (
      <div className="Card">
          {/* We need image that has:
           - heart 
           score
           - up and down buttons
           - scalable image at the correct ratio
          */}
          <div className="cat-image-container">
            <img className="cat-image" src={imageUrl} alt="A picture of a cat" />
          </div>
          <hr />
          <div className="action-buttons">
              <div className="score-container">
                  <div className="score-button" onClick={() => {onVoteAction(imageId, 1)}}><img className='arrow-up' src={Arrow}></img></div>
                  <div>{score}</div>
                  <div className="score-button" onClick={() => {onVoteAction(imageId, 0)}}><img className='arrow-down' src={Arrow}></img></div>
              </div>
              <p className="favourite-button" onClick={() => onFavourite(imageId, favouriteId)}>{favouriteId ? '❤️' : '🤍'}</p>
          </div>
          <Error errorMessage={error ?? null} />
      </div>
    )
}
  
export default Card