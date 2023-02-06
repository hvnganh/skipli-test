import React, { useState } from 'react'
import FormAccessCode from './components/FormAccessCode'
import FormPhoneNumber from './components/FormPhoneNumber'

type LoginProps = {}

export default function Login({}: LoginProps) {
  const [phoneNumber, setPhoneNumber] = useState(0)
  return (
    <main className='form__layout'>
      <section className='form-phone-number__layout'>
        <FormPhoneNumber setPhoneNumber={setPhoneNumber} />
      </section>
      <section className='form-access-code__layout'>
        <FormAccessCode phoneNumber={phoneNumber} />
      </section>
    </main>
  )
}