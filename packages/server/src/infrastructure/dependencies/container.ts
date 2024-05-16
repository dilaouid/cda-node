import { UserRepository } from '../repositories/UserRepository';
import { PostsRepository } from '../repositories/PostRepository';
import { CommentRepository } from '../repositories/CommentRepository';
import { MessageRepository } from '../repositories/MessageRepository';
import { RoomRepository } from '../repositories/RoomRepository';
import { VideoRepository } from '../repositories/VideoRepository';

import { PostService } from '../../domain/services/PostService';
import { CommentService } from '../../domain/services/CommentService';
import { MessageService } from '../../domain/services/MessageService';
import { RoomService } from '../../domain/services/RoomService';
import { VideoService } from '../../domain/services/VideoService';
import { AuthService } from '../../domain/services/AuthService';
import { UserService } from '../../domain/services/UserService';

// Repositories
const userRepository = new UserRepository();
const postRepository = new PostsRepository();
const commentRepository = new CommentRepository();
const messageRepository = new MessageRepository();
const roomRepository = new RoomRepository();
const videoRepository = new VideoRepository();

// Services
export const userService = new UserService(userRepository);
export const authService = new AuthService(userRepository);
export const postService = new PostService(postRepository);
export const commentService = new CommentService(commentRepository);
export const messageService = new MessageService(messageRepository);
export const roomService = new RoomService(roomRepository);
export const videoService = new VideoService(videoRepository);
