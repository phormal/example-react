import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import {useLength, useEmail, useRequired} from '@phormal/core'
import {useForm, FormContent} from '@phormal/react'
import '@phormal/theme-basic/dist/index.css'
import {useState} from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const formFields = {
    paymentMethod: {
      type: 'radiogroup',
      label: 'Payment Method',
      value: 'paypal',
      options: [
        {label: 'PayPal', value: 'paypal'},
        {label: 'Credit card', value: 'creditcard'},
        {label: 'Klarna', value: 'klarna'},
      ]
    },
    name: {
      label: 'Name',
      hooks: [useRequired(), useLength(3)]
    },
    email: {
      label: 'Email',
      hooks: [useRequired(), useEmail()]
    },
    newsletter: {
      type: 'checkbox',
      label: 'Newsletter',
      value: true
    },
  }
  const formInstance = useForm(formFields)

  const [values, setValues] = useState<null|Record<string, any>>(null)

  const getValues = () => {
    setValues(formInstance.$values())
  }

  const validate = () => {
    const formIsValid = formInstance.$validate()
    console.log(formIsValid)
  }

  return (
    <>
      <main className={styles.main}>
        <div className={'container'}>
          <h1>Phormal</h1>

          <FormContent instance={formInstance} />

          <button onClick={getValues}>Get values</button>

          <button onClick={validate}>Validate</button>

          <pre>
            {JSON.stringify(values, null, 2)}
          </pre>
        </div>
      </main>
    </>
  )
}
