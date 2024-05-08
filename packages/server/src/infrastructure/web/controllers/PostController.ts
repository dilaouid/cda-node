import { Request, Response } from 'express';
import { PostService } from '../../../domain/services/PostService';
import { response } from '../../../utils/response';
import { CustomRequest } from '../../../types/express';

const postService = new PostService();

export const getAllPosts = (req: Request, res: Response) => {
    const posts = postService.getAllPosts();
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
export const getPostById = (req: Request, res: Response) => {
    const postId = req.params.id;
    const post = postService.getPostById(postId);
    console.table(post);
    if (!post) {
        response(res, { statusCode: 404, message: 'Post not found' });
    } else {
        response(res, { statusCode: 200, message: 'OK', data: post });
    }
};

export const createPost = (req: CustomRequest, res: Response) => {
    const { title, content } = req.body;

    const post = { title, content, author: req.user.userId, date: new Date() };
    console.log(post);
    
    const createdPost = postService.addPost(post);
    if (!createdPost)
        return response(res, { statusCode: 400, message: 'Post not created' });
    response(res, { statusCode: 201, message: 'Post created', data: createdPost });
};