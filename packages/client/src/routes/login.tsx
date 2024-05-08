import { createFileRoute } from '@tanstack/react-router'
import { Loginpage } from '../components/templates/Loginpage'

export const Route = createFileRoute('/login')({
  component: Login
})

function Login() {
  return (
    <Loginpage />
  )
}