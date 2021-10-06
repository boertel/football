import * as React from "react";
import Flag from "./Flag";

function Icon(props) {
  return (
    <Flag viewBox="0 0 48 48" {...props}>
      <path d="M48 40a2 2 0 01-2 2H2a2 2 0 01-2-2V24h48v16z" fill="#01AD35" />
      <path d="M48 24H0V8a2 2 0 012-2h44a2 2 0 012 2v16z" fill="#E6E6E6" />
      <g clipPath="url(#prefix__clip0)">
        <path
          d="M21.239 29.135c-.384-.108-.43-.624-.803-.888-.386-.273-.773.492-1.056.164-.283-.328.129-.819-.13-1.365-.257-.546-.669-.191-.72-.655-.052-.464.386-.546.386-1.01 0-.464-.18-.655-.13-1.037.052-.382.645-.137.748-.62.103-.482-.052-.718-.026-1.018.026-.3.541-.382.824-.874.283-.491-.283-.6-.129-1.108.155-.508.619-.64.747-1.157.129-.517-.334-.437-.206-.942.129-.506.413-.56.531-.956.12-.397-.533-.694-.507-1.077.026-.383.388-.438.507-.956.12-.52-.273-.628-.325-.901-.052-.274.541-.874.325-1.291-.215-.417-.891-.075-1.175-.32-.284-.246-.102-.847-.18-1.379-.056-.378-1.082 0-1.442 0-.361 0-.361-1.147-.722-1.147-1.082 0-1.442 1.147-1.803 1.147-.36 0-.658-1.447-1.082-1.147-1.081.765-1.442 3.058-1.442 3.058s1.803-1.529 3.967-1.146c2.163.382 2.498 1.527 2.859 3.82-.438 2.279-2.679 7.25-3.374 9.68-.695 2.43 2.215 4.013 4.662 4.723.067.02.135.034.201.047l-.505-1.645z"
          fill="#BE1931"
        />
        <path
          d="M23.414 31.895c0 .898-1.53 2.695-2.959 2.695s-1.479-1.207-1.479-2.695c0-1.488 1.16-2.694 2.588-2.694 1.43 0 1.85 1.206 1.85 2.694zM33.178 31.895c0 .898-1.53 2.695-2.96 2.695-1.428 0-1.478-1.207-1.478-2.695 0-1.488 1.159-2.694 2.588-2.694 1.43 0 1.85 1.206 1.85 2.694z"
          fill="#BE1931"
        />
        <path
          d="M36.025 23.08c.114-6.475 2.735-7.817 1.918-7.965-2.356-3.263-4.098 7.062-7.428 7.799l-1.021.226c-8.403 1.86-9.126 2.311-9.05-7.18.046-5.716-4.22-1.676-3.297-.142.315.525-4.739-.497-3.667 2.138.595 1.462 1.81.357 2.185 3.913.274 2.598-.04.752.737 5.834.895 2.794 2.429 3.484 4.37 4.331.206 1.005 2.462 3.454 3.826 3.454 1.43 0 1.479-1.206 1.479-2.695h4.438c.03 0 .058-.009.09-.009.258.005.52.01.797.01 0 .897 1.537 2.549 2.96 2.694 1.5.153 2.244-.702.748-3.074-.068-.108-.23-1.92.071-2.292-.445-1.188.779-3.307.844-7.042z"
          fill="#DD2E44"
        />
        <path
          d="M25.445 10.587s-.31 1.686.664 3.616c.76 1.508 2.571 1.984 2.571 1.984s-1.014 1.01-.837 2.692c.179 1.683 1.952 3.525 1.952 3.525s-2.158.965-3.37 2.395c-1.18 1.39-1.72 3.153-1.72 3.153l-1.713-4.317.858-2.03-.064-2.436-1.598-3.515s-.304-1.265.57-2.394c.29-1.677 2.628-2.728 2.687-2.673z"
          fill="#DD2E44"
        />
        <path
          d="M23.596 11.546l-.093.096c-.811.85-1.288 1.649-1.563 2.317-.438 1.068-.353 1.85-.353 1.852l.012.094.053.079c1.784 2.643 2.002 4.575 1.817 5.839a4.184 4.184 0 01-.442 1.393 2.2 2.2 0 01-.311.453c-.853 1.092-.964 1.404-.802 1.554.158.154.625.337 1.368-1.005 0 0 .747-.806.963-2.279.162-1.105.035-2.596-.825-4.44l.134-.112c1.681 1.256 4.244 3.319 5.916 5.375v.001c.138.174.387.2.557.06a.399.399 0 00.05-.564h-.001v-.001c-2.085-2.563-5.368-5.04-6.916-6.143l-.177-.126.214-.037c.189-.032.402-.062.646-.083 1.053-.09 2.577-.007 4.44.707h.002a.39.39 0 00.51-.228.397.397 0 00-.232-.513h-.001c-1.979-.758-3.627-.855-4.785-.756-.528.045-.96.133-1.275.216l-.133.035.022-.137c.038-.235.117-.546.274-.93.378-.92 1.222-2.197 3.134-3.536a.398.398 0 00.105-.555.388.388 0 00-.55-.098h-.001c-.709.497-1.287.992-1.757 1.472zM31.255 24.93c.71-.194 1.186-.738 1.06-1.216-.126-.478-.805-.708-1.516-.514-.711.194-1.186.739-1.06 1.217.126.477.804.707 1.516.513zM27.825 25.86c.712-.194 1.186-.738 1.06-1.216-.125-.478-.804-.708-1.515-.514-.712.194-1.186.739-1.06 1.216.125.478.804.708 1.515.514zM24.396 26.79c.711-.194 1.186-.739 1.06-1.216-.126-.478-.804-.708-1.516-.514-.711.194-1.186.738-1.06 1.216.126.478.805.708 1.516.514zM26.57 28.06c.711-.194 1.186-.738 1.06-1.216-.126-.478-.804-.708-1.515-.514-.712.194-1.187.739-1.06 1.216.125.478.804.708 1.515.514zM30 27.13c.71-.194 1.185-.738 1.06-1.216-.126-.478-.805-.708-1.516-.514-.712.194-1.186.739-1.06 1.216.125.478.804.708 1.515.514z"
          fill="#BE1931"
        />
        <path
          d="M20.457 15.352c0 2.388-1.413 4.888-3.46 4.541-3.158-.534-3.325-1.553-3.806-.928-1.73 2.247-2.755-.29-3.149-.712C9.943 18.148 8 17.57 8 16.46c0-.718 1.038-1.45 1.73-.738 1.022-.026 4.845-3.695 7.267-3.695 2.422-.001 3.46 1.847 3.46 3.325z"
          fill="#DD2E44"
        />
        <path
          d="M16.65 14.85c0 .387-.31.701-.691.701a.697.697 0 01-.693-.7c0-.387.31-.7.693-.7.382 0 .692.313.692.7z"
          fill="#292F33"
        />
        <path
          d="M9.73 16.777c0 .29-.232.175-.519.175-.286 0-.519.115-.519-.175s.233-.525.52-.525c.286 0 .518.235.518.525z"
          fill="#BE1931"
        />
        <path
          d="M14.575 17.3c0 .388-.233.35-.52.35-.286 0-.519.037-.519-.35 0-.386.233-1.4.52-1.4.286 0 .519 1.014.519 1.4zM13.19 17.65c0 .388-.232.35-.518.35-.287.001-.52.038-.52-.35 0-.386.233-1.4.52-1.4.286 0 .519 1.014.519 1.4z"
          fill="#fff"
        />
        <path
          d="M14.526 17.306c-1.836.265-3.687.734-4.484.947.1.107.24.348.421.613.873-.228 2.523-.63 4.161-.866a.35.35 0 00-.098-.694zM14.724 15.276a.588.588 0 01-.42-.176.605.605 0 010-.848c.05-.05 1.235-1.227 3.188-1.227.328 0 .594.27.594.6 0 .332-.266.6-.593.6-1.445 0-2.34.866-2.35.875a.588.588 0 01-.419.176z"
          fill="#BE1931"
        />
        <path
          d="M20.304 14.087c-.403.706-.79.39-1.316.082-.525-.307-.99-.489-.587-1.194.402-.704 1.883-2.303 2.408-1.996.525.307-.103 2.404-.505 3.108z"
          fill="#DD2E44"
        />
        <path
          d="M20.567 11.535c-.05-.17-1.51.557-1.863 1.454 0 0 1.04.775 1.224 1.345 0 0 .892-1.946.639-2.8z"
          fill="#BE1931"
        />
        <path
          d="M20.052 12.712c.101-.384-1.665.34-1.467.686.198.345.287.287.485.632.197.345.91-1.047.982-1.318zM38.042 16.916c-.854.978-.086-.919-.81-1.566-.723-.647-2.664.198-1.811-.778.853-.977 3.676-3.012 4.4-2.364.724.647-.926 3.732-1.779 4.708z"
          fill="#DD2E44"
        />
        <path
          d="M30.594 34.593c-.507.162-2.064.037-2.571-.383-.507-.42.156-.652.996-.92s1.932-.145 2.44.274c.507.42-.025.76-.865 1.03zM20.407 34.553c-.507.162-2.064.037-2.571-.383-.507-.42.156-.651.996-.92.84-.268 1.932-.145 2.44.274.507.42-.025.76-.865 1.03z"
          fill="#BE1931"
        />
        <path
          d="M24.55 35.64c-.6.191-2.444.043-3.046-.455-.6-.497.185-.772 1.18-1.09.996-.317 2.29-.172 2.89.325.602.498-.028.901-1.023 1.22zM34.452 35.919c-.601.192-2.445.044-3.047-.454-.6-.497.185-.772 1.18-1.09.996-.318 2.29-.172 2.89.325.602.497-.028.901-1.023 1.219zM35.235 26.928h-1.02v6.131h1.02v-6.13z"
          fill="#DD2E44"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path fill="#fff" transform="translate(8 10)" d="M0 0h32v26H0z" />
        </clipPath>
      </defs>
    </Flag>
  );
}

export default Icon;