import { createFileRoute } from '@tanstack/react-router'
import { Registerpage } from '../components/templates/Registerpage'

export const Route = createFileRoute('/register')({
  component: Register
})

function Register() {
  return (
    <Registerpage />
  )
}