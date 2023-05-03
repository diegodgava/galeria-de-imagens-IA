import Image from 'next/image'
import React from 'react'
import iaLogo from '../imagens/chatgpt-logo-02AFA704B5-seeklogo.com.png'
import Link from 'next/link'

function Header() {
  return (
    <header className='flex p-5 justify-between sticky top-0 bg-white z-50 shadow-md'>

        <div className='flex space-x-2 items-center'>
          <Image src={iaLogo} alt='ia-logo' height={30} width={30}/>

          <div>
            <h1 className='font-bold'>
                Gerador de imagens <span 
                className='text-violet-500'>IA</span>
            </h1>
            <h2 className='text-xs'>
                Utilizando DALL-E 2, Chat GPT & Microsoft Azure.
            </h2>
            </div>
        </div>
       <div className='flex text-xs md:text-base divide-x items-center text-gray-500'>
        <span className='px-2 font-light'>Criado por Diego Gava</span>
        <Link href={'https://github.com/diegodgava'} 
        className='px-2 font-light text-right'>GitHub</Link>
        <Link href={'https://www.linkedin.com/in/diego-gava-/'} className='px-2 font-light'>
          LinkedIn</Link>
      </div>

    </header>
  )
}

export default Header