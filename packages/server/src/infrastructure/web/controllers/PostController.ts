import { Request, Response } from 'express';
import { response } from '../../../utils/response';
import { postService } from '../../dependencies/container';
import '../../../types/express'; // Activate module declaration

export const getAllPosts = async (req: Request, res: Response) => {
    const posts = await postService.getAllPosts();
    console.table(posts);
    response(res, {
        statusCode: 200,
        message: 'OK',
        data: posts
    })
};


// localhost:3000/posts/1
// localhost:3000/posts/125
// localhost:3000/posts/125545
export const getPostById = async (req: Request, res: Response) => {
    const postId = req.params.id;
    const post = await postService.getPostById(postId);
    if (!post) {
        response(res, { statusCode: 404, message: 'Post not found' });
    } else {
        console.table(post[0]);
        response(res, { statusCode: 200, message: 'OK', data: post[0] });
    }
};

export const createPost = async (req: Request, res: Response) => {
    const { title, content } = req.body;

    const post = { title, content, author: req.user.userId, date: new Date() };
    console.log(post);
    
    const createdPost = await postService.addPost(post);
    if (!createdPost)
        return response(res, { statusCode: 400, message: 'Post not created' });
    response(res, { statusCode: 201, message: 'Post created' });
};