import React, { useEffect, useMemo, useRef, useState } from "react";
import PostForm from "./Components/PostForm";
import PostList from "./Components/PostList";
import './styles/app.css'
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";
import PostFilter from "./Components/PostFilter";
import MyModal from "./UI/MyModal/MyModal";
import { usePosts } from "./hooks/usePost";
import axios from 'axios'
import PostService from "./API/PostService";
import Loader from "./UI/Loader/Loader";
import { useFetching } from "./hooks/useFetching";
import { getPageCount, getPagesArray } from "./utils/page";
import Pagination from "./UI/pagination/Pagination";

function App() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const sortedAndSerachedPosts = usePosts(posts, filter.sort, filter.query)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const [fetchPosts, isLoadingPosts, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data)
    const totalCount = (response.headers['x-total-count'])
    setTotalPages(getPageCount(totalCount, limit))
  })



  useEffect(() => {
    fetchPosts()
  }, [page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(i => i.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">

      <MyButton style={{ margin: 15 }} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>



      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />

      {postError &&
        <h1>Произошла ошибка {postError}</h1>
      }

      {
        isLoadingPosts
          ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
          : <PostList remove={removePost} title={'Первый список постов'} posts={sortedAndSerachedPosts} />
      }

      <Pagination page={page} totalPages={totalPages} changePage={changePage} />

    </div>
  );
}

export default App;
