import { createFileRoute } from '@tanstack/react-router'
import { Createpage } from '../components/templates/Createpage'

export const Route = createFileRoute('/create')({
  component: Create
})

function Create() {
  return (<Createpage />)
}