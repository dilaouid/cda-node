import { Container, Spinner } from "react-bootstrap";
import { Header } from "../molecules/blog/Header";
import { useGetPosts } from "../../hooks/useGetPosts";
import { PostsResume } from "../molecules/blog/PostsResume";

export const Blogpage = () => {
    const { data, isPending, isError } = useGetPosts();
    console.log(data);
    
    return (
        <Container className="py-4 py-xl-5">
            <Header>
                <h2>Blog</h2>
                <p className="w-lg-50">La liste de tout les articles stylés. Ils veulent tous rien dire, car c'est juste du placeholder placé comme ça pour apprendre à créer une API, faut pas s'attendre au blog du siècle.</p>
            </Header>
            { isPending && <p className="text-center fst-italic"><Spinner variant="light" size="sm" /> Chargement des articles ...</p> }
            { isError && <p className="text-center text-danger">Erreur lors du chargement des articles</p> }
            { data && <PostsResume posts={data} /> }
        </Container>
    )
};