'use client'

import fetchImages from "../lib/fetchImages";
import fetchSuggestionFromChatGPT from '@/lib/fetchSuggestionFromChatGPT'
import React, { useState, FormEvent } from 'react'
import useSWR from 'swr'
import toast from "react-hot-toast";


function PromptInput() {
  const [input, setInput] = useState("");

  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("suggestion", fetchSuggestionFromChatGPT, {
    revalidateOnFocus: false,
  });

  const { mutate: updateImages } = useSWR("images", fetchImages, {
    revalidateOnFocus: false,
  });

  const submitPrompt = async (useSuggestion?: boolean) => {
    const inputPrompt = input;
    console.log(inputPrompt);
    setInput("");

    const notificationPrompt = inputPrompt || suggestion;
    const notificationPromptShort = notificationPrompt.slice(0, 20);

    const notification = toast.loading(
      `DALL·E está criando: ${notificationPromptShort}...`
    ); 

    const p = useSuggestion
    
      ? suggestion
      : inputPrompt || (!isLoading && !isValidating && suggestion);

    const res = await fetch("/api/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: p,
      }),
    });

    const data = await res.json();

    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(`Sua arte IA foi criada!`, {
        id: notification,
      });
    } 

    updateImages();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await submitPrompt();
  };


const loading = isLoading || isValidating

  return (
    <div className='m-10'>
        <form onSubmit={handleSubmit} className='flex flex-col lg:flex-row shadow-md
        shadow-slate-400/10 border rounded-md lg:divide-x'>
<textarea
  value={input}
  onChange={(e) => setInput(e.target.value)}
  placeholder={
    loading
      ? 'ChatGPT está pensando em uma sugestão...'
      : suggestion || 'Insira uma frase'
  }
  className='flex-1 p-3 outline-none rounded-md resize-none'
  style={{ maxHeight: '100px' }}
/>
        

            
      <button type='submit' className={`p-4 font-bold ${input ? 'bg-violet-500 text-white transiition-colors duration-200' : 'text-gray-300 cursor-not-allowed'}`}
      disabled = {!input}
      >Criar</button>

      <button type='button' className='p-4 bg-violet-400 text-white transition-colors
      duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed
      disabled:bg-gray-400'
      onClick={() => submitPrompt(true)}
      >Usar Sugestão</button>


      <button type = 'button' className='p-4 bg-white text-violet-500 border-none 
      transition-colors duration-200 rounded-b-md md:rounded-r-md 
      md:rounded-bl-none font-bold'
      onClick={mutate}
      >Nova Sugestão</button>
        </form>

        {input && (
          <p className='italic pt-2 pl-2 font-light'>
             Sugestão: {" "}
            <span className='text-violet-500'>
              {loading ? "ChatGPT está pensando..." : suggestion}
            </span>

          </p>

        )}

    </div>
  )
}

export default PromptInput