import { useEffect } from 'react';

import { createFileRoute } from '@tanstack/react-router'
import { Blogpage } from '../components/templates/Blogpage';

import AOS from 'aos';

export const Route = createFileRoute('/blog')({
  component: Blog
})

function Blog() {
  useEffect(() => {
    AOS.init({
      once: true
    });
    AOS.refresh();
  }, []);
  return (
    <Blogpage />
  );
}