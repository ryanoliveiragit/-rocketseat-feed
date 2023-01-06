import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";
import "./global.css";
import styles from "./App.module.css";

// author: { avatar_url: "", name: "", role: ""}
// publishedAt: Date
// content: String;

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/diego3g.png",
      name: "Diego Fernandes",
      role: "CTO @ Rocketseat",
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa', },
      { type: 'paragraph', content: 'no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare'},
      { type: 'link', content: 'jane.design/doctorcare'},
    ],
    publishedAt: new Date('2023-01-03 11:30:00'),
  },

  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/maykbrito.png",
      name: "Mayke Brito",
      role: "Educator @ Rocketseat",
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋'},
      { type: 'paragraph', content: 'no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      { type: 'link', content: 'jane.design/doctorcare'},
    ],
    publishedAt: new Date('2023-01-03 11:30:00'),
  },
];


export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {/*Aqui ele vai mapear todos os meus conteudos de dentro do array de objetos*/}
         {posts.map(post => {
          return (
          //ele vai percorrer todos as linhas e retornar pra elas a VARIAVEL que pode ser
          //chamada dentro do componente post como vemos a baixo no proximo print
            <Post 
            key={post.id}
            author={post.author}
            content={post.content}
            publishedAt={post.publishedAt}
            />
          )
         })}
        </main>
      </div>
    </div>
  );
}
