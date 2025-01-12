import "./globals.css";
import AdminHeader from './components/AdminHeader';
import AdminFooter from './components/AdminFooter';



export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <head>
        <title>YAKJIGI-관리자</title>

        <script
          type="text/javascript"
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=933487853729474a473e38bfd47ce1f5&libraries=services"></script>

        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
        {/* 다른 메타 태그나 링크 추가 가능 */}
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon32.png" />
        <link rel="icon" type="image/png" sizes="48x45" href="/images/favicon48.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/favicon192.png" />

      </head>
      <body>
        <AdminHeader />
        {children}
        <AdminFooter />
      </body>
    </html>
  );
}