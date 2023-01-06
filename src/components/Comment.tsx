import { ThumbsUp, Trash } from "phosphor-react";
import { FunctionComponent, useState } from "react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";

interface commentProps{
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment( {content ,onDeleteComment}: commentProps) {

  const [likeCount, setLikeCount] = useState(0)

  function handleDeleteComment(){
    onDeleteComment(content)
  }

  function handleLikeComment() {
    setLikeCount((state) =>{
      return state + 1 
    }); //meio que vai adicionar eles em uma fila de espera.
}
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/diego3g.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Diego Fernandes</strong>
              <time title="11 de Maio as 11:13" dateTime="2023-01-01 10:00:27">
                Cerca de 1h atrás
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar comentário">
                <Trash size={24} />
              </button>
          </header>
          <p>{content}</p>
          </div>
          <footer>
            <button onClick={handleLikeComment}>
              <ThumbsUp />
              aplaudir <span>{likeCount}</span>
            </button>
          </footer>
      </div>
    </div>
  );
}
