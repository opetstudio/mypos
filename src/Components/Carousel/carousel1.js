import React, { Component } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

class Carousel1 extends Component {
  render () {
    return (
      <Carousel emulateTouch>
        <div>
          <img src='http://react-responsive-carousel.js.org/assets/1.jpeg' />
          <p className='legend'>
        Legend
          </p>
        </div>
        <div>
          <img src='http://react-responsive-carousel.js.org/assets/2.jpeg' />
          <p className='legend'>
        Legend
          </p>
        </div>
        <div>
          <img src='http://react-responsive-carousel.js.org/assets/3.jpeg' />
          <p className='legend'>
        Legend
          </p>
        </div>
        <div>
          <img src='http://react-responsive-carousel.js.org/assets/4.jpeg' />
          <p className='legend'>
        Legend
          </p>
        </div>
        <div>
          <img src='http://react-responsive-carousel.js.org/assets/5.jpeg' />
          <p className='legend'>
        Legend
          </p>
        </div>
      </Carousel>
    )
  }
}
export default Carousel1
