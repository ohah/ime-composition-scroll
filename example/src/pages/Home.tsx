import { useState } from 'react';
import '../pages.css';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  return (
    <div className="page">
      <h2>홈 페이지</h2>
      <p>이 페이지에는 기본 입력 필드들이 있습니다. 스크롤 테스트를 위해 긴 컨텐츠를 포함합니다.</p>

      <div className="form-group">
        <label htmlFor="home-input">상단 Input 필드:</label>
        <input
          id="home-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="홈 페이지 상단의 input 필드입니다..."
        />
      </div>

      <div className="long-content">
        <h3>긴 컨텐츠 섹션 1</h3>
        <p>
          이 영역은 스크롤 테스트를 위한 긴 컨텐츠입니다. IME composition 중 스크롤이 발생할 때 입력 필드가
          화면 밖으로 이동했을 때의 동작을 테스트하기 위해 충분한 높이가 필요합니다.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
          beatae vitae dicta sunt explicabo.
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="home-textarea">중간 Textarea 필드:</label>
        <textarea
          id="home-textarea"
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
          placeholder="홈 페이지 중간의 textarea 필드입니다..."
          rows={5}
        />
      </div>

      <div className="long-content">
        <h3>긴 컨텐츠 섹션 2</h3>
        <p>
          두 번째 긴 컨텐츠 섹션입니다. 페이지 하단에도 입력 필드가 있어 스크롤 후 입력 시 동작을
          확인할 수 있습니다.
        </p>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
          consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
        <p>
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
          sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
          voluptatem.
        </p>
        <p>
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi
          ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea
          voluptate velit esse quam nihil molestiae consequatur.
        </p>
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
          voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
          cupiditate non provident.
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="home-bottom-input">하단 Input 필드:</label>
        <input
          id="home-bottom-input"
          type="text"
          placeholder="홈 페이지 하단의 input 필드입니다. 스크롤 후 이 필드에 입력해보세요..."
        />
      </div>
    </div>
  );
}

