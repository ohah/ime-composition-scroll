import { useState } from 'react';
import '../pages.css';

export default function About() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [topContentEditable, setTopContentEditable] = useState('상단 ContentEditable 필드입니다. 여기에 입력해보세요...');
  const [contentEditable, setContentEditable] = useState('이 영역을 편집할 수 있습니다...');

  return (
    <div className="page">
      <h2>소개 페이지</h2>
      <p>이 페이지에는 소개 관련 입력 필드들이 있습니다. 스크롤 테스트를 위한 긴 컨텐츠를 포함합니다.</p>

      <div className="form-group">
        <label htmlFor="about-top-editable">상단 ContentEditable 필드:</label>
        <div
          id="about-top-editable"
          contentEditable
          className="contenteditable-div"
          suppressContentEditableWarning
          onInput={(e) => {
            const target = e.currentTarget;
            setTopContentEditable(target.textContent || '');
          }}
        >
          {topContentEditable}
        </div>
        <p className="help-text">이 필드는 페이지 상단에 위치합니다. 한글 입력을 테스트해보세요.</p>
      </div>

      <div className="form-group">
        <label htmlFor="about-name">이름 (상단):</label>
        <input
          id="about-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="about-search">검색 필드:</label>
        <input
          id="about-search"
          type="search"
          placeholder="검색어를 입력하세요..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="about-tel">연락처:</label>
        <input
          id="about-tel"
          type="tel"
          placeholder="전화번호를 입력하세요..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="about-email">이메일:</label>
        <input
          id="about-email"
          type="email"
          placeholder="your@email.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="about-url">웹사이트:</label>
        <input
          id="about-url"
          type="url"
          placeholder="https://example.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="about-password">비밀번호:</label>
        <input
          id="about-password"
          type="password"
          placeholder="비밀번호를 입력하세요..."
        />
      </div>

      <div className="long-content">
        <h3>프로필 정보</h3>
        <p>
          이 섹션은 스크롤 테스트를 위한 긴 컨텐츠입니다. 사용자가 IME composition 중 스크롤을
          하거나 다른 영역을 클릭할 때의 동작을 테스트하기 위해 충분한 높이를 확보했습니다.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius
          blandit sit amet non magna. Donec ullamcorper nulla non metus auctor fringilla.
        </p>
        <p>
          Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel
          scelerisque nisl consectetur et. Fusce dapibus, tellus ac cursus commodo, tortor mauris
          condimentum nibh.
        </p>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur
          ac, vestibulum at eros. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="about-bio">자기소개 (중간):</label>
        <textarea
          id="about-bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="자기소개를 입력하세요..."
          rows={6}
        />
      </div>

      <div className="long-content">
        <h3>추가 정보</h3>
        <p>
          더 많은 정보를 표시하기 위한 긴 컨텐츠 영역입니다. 이 영역을 통해 페이지 하단에 있는
          ContentEditable 필드로 스크롤해야 합니다.
        </p>
        <p>
          Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere
          consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.
        </p>
        <p>
          Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </p>
        <p>
          Maecenas faucibus mollis interdum. Etiam porta sem malesuada magna mollis euismod. Donec
          ullamcorper nulla non metus auctor fringilla.
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="about-editable">ContentEditable 필드 (하단):</label>
        <div
          id="about-editable"
          contentEditable
          className="contenteditable-div"
          suppressContentEditableWarning
          onInput={(e) => {
            const target = e.currentTarget;
            setContentEditable(target.textContent || '');
          }}
        >
          {contentEditable}
        </div>
        <p className="help-text">이 필드는 페이지 하단에 위치합니다. 스크롤 후 한글 입력을 테스트해보세요.</p>
      </div>
    </div>
  );
}

