import React, { useEffect, useState } from "react"

const Home = () => {
  // total loops until the text raffled
  const totalLoop = 40

  const [name, setName] = useState()
  const [count, setCount] = useState()
  const [list, setList] = useState([])
  const [showEditor, setShowEditor] = useState(true)
  const [isFinal, setIsFinal] = useState(false)
  const [originalNames, setOriginalNames] = useState()

  const randomize = () => {
    let index = Math.floor(Math.random() * list.length)
    setName(list[index])
  }

  const loop = () => {
    if (count < totalLoop) {
      randomize()
      setCount(count + 1)
    }
    if (count === totalLoop && name) {
      setIsFinal(true)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      loop()
    }, 150)
  }, [count, loop])

  const startRaffle = () => {
    setShowEditor(false)
    setIsFinal(false)
    setCount(0)
  }

  const buildNewNames = newNames => {
    setOriginalNames(newNames)
    newNames = newNames
      .replace(/(.+)\n/g, "$1,")
      .split(",")
      .filter(item => !!item)

    setList(newNames)
  }

  return (
    <div className='flex flex-col w-full max-w-lg gap-4 px-6'>
      <div>
        {isFinal && (
          <p className='text-lg font-bold text-green-500'>Parabéns,</p>
        )}
        <h1 className='text-center text-2xl sm:text-5xl font-bold h-28 text-white'>
          {name}
        </h1>
      </div>
      <div className='flex flex-col gap-4'>
        {showEditor && (
          <div className='row mt-2'>
            <div className='flex flex-col gap-2'>
              <label className='text-white' htmlFor='names'>
                Insira a lista:
              </label>
              <textarea
                className='px-4'
                placeholder='Adicione cada nome em uma nova linha'
                id='names'
                value={originalNames}
                style={{ minHeight: "30vh", resize: "x" }}
                onChange={e => buildNewNames(e.target.value)}
              ></textarea>
            </div>
          </div>
        )}

        <div className='flex gap-4 justify-center'>
          <button
            className='px-4 py-1 bg-gray-200 rounded-md'
            onClick={startRaffle}
          >
            Sortear
          </button>

          {!showEditor && (
            <button
              className='px-4 py-1 bg-gray-200 rounded-md'
              onClick={() => setShowEditor(true)}
            >Editar Lista</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
