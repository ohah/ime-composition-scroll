import { useState } from 'react';
import '../pages.css';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showExtraField, setShowExtraField] = useState(false);
  const [extraValue, setExtraValue] = useState('');

  return (
    <div className="page">
      <h2>연락처 페이지</h2>
      <p>이 페이지에는 연락처 관련 입력 필드들이 있습니다. 스크롤 테스트를 위한 긴 컨텐츠를 포함합니다.</p>

      <div className="long-content">
        <h3>연락처 안내</h3>
        <p>
          이 페이지는 연락처 양식 테스트를 위한 페이지입니다. IME composition 중 스크롤 후 다른
          영역을 클릭했을 때 입력 필드로 스크롤이 돌아가는 문제를 테스트합니다.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Morbi rutrum in
          leo quis consequat. Phasellus sit amet erat nulla. Donec quis orci eget orci vehicula
          condimentum.
        </p>
        <p>
          Curabitur blandit tempus porttitor. Vestibulum id ligula porta felis euismod semper. Cum
          sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="contact-email">이메일 (중간):</label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-tel">전화번호:</label>
        <input
          id="contact-tel"
          type="tel"
          placeholder="전화번호를 입력하세요..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-search">검색:</label>
        <input
          id="contact-search"
          type="search"
          placeholder="검색어를 입력하세요..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-url">웹사이트:</label>
        <input
          id="contact-url"
          type="url"
          placeholder="https://example.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-password">비밀번호:</label>
        <input
          id="contact-password"
          type="password"
          placeholder="비밀번호를 입력하세요..."
        />
      </div>

      <div className="long-content">
        <h3>연락 방법</h3>
        <p>
          다양한 연락 방법에 대한 안내입니다. 이 영역은 스크롤 테스트를 위해 충분한 높이를 가지고
          있습니다.
        </p>
        <p>
          Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia
          quam venenatis vestibulum. Donec id elit non mi porta gravida at eget metus.
        </p>
        <p>
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus
          varius blandit sit amet non magna. Duis mollis, est non commodo luctus, nisi erat porttitor
          ligula.
        </p>
        <p>
          Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet
          fermentum. Nullam id dolor id nibh ultricies vehicula ut id elit.
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="contact-message">메시지 (중하단):</label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          rows={8}
        />
      </div>

      <div className="long-content">
        <h3>추가 정보</h3>
        <p>
          연락처 페이지의 추가 정보 영역입니다. 페이지 하단에 동적으로 추가되는 필드를 테스트하기
          위한 컨텐츠입니다.
        </p>
        <p>
          Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras justo odio, dapibus
          ac facilisis in, egestas eget quam. Donec ullamcorper nulla non metus auctor fringilla.
        </p>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </p>
      </div>

      <div className="form-group">
        <button onClick={() => setShowExtraField(!showExtraField)}>
          {showExtraField ? '추가 필드 숨기기' : '추가 필드 보이기'}
        </button>
      </div>

      {showExtraField && (
        <div className="form-group">
          <label htmlFor="contact-extra">추가 입력 필드 (동적 추가, 하단):</label>
          <input
            id="contact-extra"
            type="text"
            value={extraValue}
            onChange={(e) => setExtraValue(e.target.value)}
            placeholder="동적으로 추가된 필드입니다. 스크롤 후 이 필드에 입력해보세요..."
          />
        </div>
      )}
    </div>
  );
}

