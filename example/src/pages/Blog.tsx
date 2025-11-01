import { useState } from 'react';
import '../pages.css';

export default function Blog() {
  const [title, setTitle] = useState('');
  const [posts, setPosts] = useState<string[]>(['포스트 1', '포스트 2']);

  const addPost = () => {
    setPosts([...posts, `포스트 ${posts.length + 1}`]);
  };

  const removePost = (index: number) => {
    setPosts(posts.filter((_, i) => i !== index));
  };

  return (
    <div className="page">
      <h2>블로그 페이지</h2>
      <p>이 페이지에는 블로그 포스트 관련 입력 필드들이 있습니다. 스크롤 테스트를 위한 긴 컨텐츠를 포함합니다.</p>

      <div className="form-group">
        <label htmlFor="blog-title">제목 (상단):</label>
        <input
          id="blog-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="블로그 포스트 제목..."
        />
      </div>

      <div className="long-content">
        <h3>블로그 소개</h3>
        <p>
          블로그 페이지는 여러 포스트를 관리하는 인터페이스를 제공합니다. IME composition 중 스크롤
          후 다른 영역을 클릭했을 때의 동작을 테스트하기 위한 페이지입니다.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
          architecto beatae vitae dicta sunt explicabo.
        </p>
      </div>

      <div className="form-group">
        <label>포스트 목록 (중간):</label>
        <button onClick={addPost} style={{ marginBottom: '1rem' }}>
          포스트 추가
        </button>

        {posts.map((post, index) => (
          <div key={index} className="list-item">
            <input
              type="text"
              value={post}
              onChange={(e) => {
                const newPosts = [...posts];
                newPosts[index] = e.target.value;
                setPosts(newPosts);
              }}
              placeholder={`포스트 ${index + 1}`}
            />
            <button onClick={() => removePost(index)}>제거</button>
          </div>
        ))}
      </div>

      <div className="long-content">
        <h3>추가 컨텐츠</h3>
        <p>
          블로그 페이지의 추가 정보 영역입니다. 페이지 하단으로 스크롤하여 입력 필드와의 상호작용을
          테스트할 수 있습니다.
        </p>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
          consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
        <p>
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
          velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
          quaerat voluptatem.
        </p>
        <p>
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
          nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea
          voluptate velit esse quam nihil molestiae consequatur.
        </p>
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
          voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
          cupiditate non provident.
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="blog-bottom-input">하단 Input 필드:</label>
        <input
          id="blog-bottom-input"
          type="text"
          placeholder="블로그 페이지 하단의 input 필드입니다. 스크롤 후 이 필드에 입력해보세요..."
        />
      </div>
    </div>
  );
}

