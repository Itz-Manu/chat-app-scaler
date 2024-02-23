import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/layout/Button'
import Input from '../components/layout/Input'

export default function Home() {
  return (
    <div>
      <section className="w-full py-6">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:gap-10 md:px-6 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-4 lg:items-start lg:gap-6 xl:gap-4">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold tracking-normal sm:text-5xl xl:text-6xl/none">
                Welcome to our Chat App!
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-lg dark:text-gray-400 ml-3 my-3">
                Connect with friends, share photos and videos, and stay connected anytime, anywhere.
              </p>
            </div>
            <Link to={"/login"}><Button className='ml-5 px-5 py-3'>Get Started</Button></Link>

          </div>
          <img
            alt="Hero"
            className="aspect-video overflow-hidden rounded-xl object-bottom lg:order-last lg:aspect-square min-[300px]:h-[50vh] min-[600px]:h-[70vh]"
            height="275"
            src="./Hero-7.webp"
            width="600"
            loading='lazy'
          />
        </div>
      </section>

      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <img
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
              height="310"
              src="./Hero-6.webp"
              width="550"
              loading='lazy'
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Join the Conversation!
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg dark:text-gray-400">
                  Join our chat community and connect with friends, family, and colleagues. Share messages, photos, and
                  more in real-time.
                </p>
              </div>
              <div className="w-full max-w-sm mx-auto space-y-2">
                <form className="grid gap-2 mb-5">
                  <Input className='py-3' placeholder="Enter your username..." type="text" />
                  
                  <Button type="submit">Join Chat</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400 mx-auto">
                  By joining, you agree to our <Link className="underline underline-offset-2" href="#">Terms & Conditions</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
