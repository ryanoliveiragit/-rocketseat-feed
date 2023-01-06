import styles from "./Post.module.css";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR'
import React, { FormEvent, useState, EventHandler, KeyboardEventHandler, ChangeEvent, InvalidEvent } from "react";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: string;
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}


export function Post({ author, publishedAt, content }: PostProps) {

  const [comments, setComments] = useState([
    'Post muito bacana hein?!'
  ])

  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  })
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt,{
    locale: ptBR,
    addSuffix: true,
  })

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  };

  function deleteComment(commentToDelete: string ) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment != commentToDelete;
    })

    setComments(commentsWithoutDeletedOne)
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity("") //tira a msg de erro de campo

    setNewCommentText(event.target.value) //pega o valor que esta sendo digitado pelo user
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("este campo é obrigatorio")
  }
  
  const isNewCommentEmpty = newCommentText.length === 0

    return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>

       {/*percorrer o content que e vem la do meu array de objetos, e guardar ele dentro
        da variavel linha*/}
        {content.map(linha => {

          //* se o tipo da linha for igual a paragrafo que esta vindo do objeto
          if (linha.type === 'paragraph'){

          //* retornar dentro da tag p o conteudo da linha
            return <p key={linha.content}>{linha.content}</p>

            //* e se, o tipo da linha for igual a link
          } else if (linha.type === 'link') {

            //* retornar dentro da tag a o conteudo da linha
            return <p key={linha.content}><a href="">{linha.content}</a></p>
          }

        })}
        <form onSubmit={handleCreateNewComment} className={styles.comentForm}>
          <strong>Deixe seu feedback</strong>

          <textarea
            required={true}
            value={newCommentText}
            name="comment"
            onChange={handleNewCommentChange}
            placeholder="Deixe um comentário" 
            onInvalid={handleNewCommentInvalid}
          />

          <footer>
            <button type="submit" disabled={isNewCommentEmpty}>
              Publicar
            </button>
          </footer>
        </form>
      </div>
      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment content={comment} onDeleteComment={deleteComment}/>
          )
        })}
      </div>
    </article>
  );
}
