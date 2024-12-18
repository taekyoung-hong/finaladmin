'use client';

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styles from '../styles/ad201.module.css'
import adcommons from '../styles/adcommons.module.css'
import { useRouter } from 'next/navigation';



// 검색창 컴포넌트
function SearchBar() {
    const [searchQuery, setSearchQuery] = React.useState("");
  
    return (
      <div className={adcommons.adcommons__searchcontainer}>
        {/* 검색 옵션 */}
        <div className={adcommons.adcommons__searchdropdown}>
          <select className={adcommons.adcommons__category} defaultValue="아이디">
            <option value="아이디">아이디</option>
            <option value="이름">이름</option>
            <option value="이메일">이메일</option>
          </select>
        </div>
  
        {/* 검색바 */}
        <div className={adcommons.adcommons__searchbar}>
          <input type="text" placeholder="검색어를 입력하세요." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
          <button type="button" >
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>
    );
  }

  
  const columns = [
    { field: 'id', headerName: '아이디', width: 207 },
    { field: 'Name', headerName: '이름',width: 207 },
    { field: 'email', headerName: '이메일',width: 400 },
    { field: 'regdate', headerName: '최초 가입일', width: 207 },
    { field: 'level', headerName: '등급',width: 207 },
  ];
  
 // 모든 컬럼에 대해 `headerAlign: 'center'`를 동적으로 추가
 const centeredColumns = columns.map(column => ({
  ...column,
  headerAlign: 'center'
}));

  const rows = [
    { id: 'hong', Name: 'Snow', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'park', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'kim', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'lee', Name: 'Stark', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'yoon', Name: 'Targaryen', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'sdkw', Name: 'Melisandre', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'asdf', Name: 'Clifford', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'sadeee', Name: 'Frances', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'hhhg', Name: 'Roxie', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'hosdfng', Name: 'Snow', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'sdrkfs', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'sdewr', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'zcgh', Name: 'Stark', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'qhjm', Name: 'Targaryen', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'ssgjt', Name: 'Melisandre', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'deey', Name: 'Clifford', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'ercge', Name: 'Frances', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'yhnv', Name: 'Roxie', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'ddddd', Name: 'Melisandre', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'eeeee', Name: 'Clifford', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'qqqqq', Name: 'Frances', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'aaaaa', Name: 'Roxie', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'yyyyy', Name: 'Clifford', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'gjklkl', Name: 'Frances', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'hhhhh', Name: 'Roxie', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'ttgb', Name: 'Frances', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'cccd', Name: 'Roxie', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'ddcccc', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'cddd', Name: 'Stark', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'fffff', Name: 'Targaryen', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'ffafff', Name: 'Melisandre', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'fffd', Name: 'Clifford', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'dddsd', Name: 'Frances', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'ddedd', Name: 'Roxie', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'eedddcc', Name: 'Melisandre', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'qqqwe', Name: 'Clifford', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'qqwerr', Name: 'Frances', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'rtttq', Name: 'Roxie', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'tttqd', Name: 'Clifford', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
    { id: 'ssssf', Name: 'Frances', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },

  ];
  
  export default function DataTable() {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 5;
    const router = useRouter();

    const handlePageChange = (event, value) => {
      setPage(value);
    };
  
    const startIndex = (page - 1) * rowsPerPage;
    const currentRows = rows.slice(startIndex, startIndex + rowsPerPage);
  
    
  const handleRowClick = (params) => {
    const { id } = params.row;
    router.push(`/ad201detail?${id}`); // 상세보기 페이지로 이동
  };



    return (
      <div className={adcommons.adcommons__container}>
        <h1 className={adcommons.adcommons__title}>일반 회원 관리</h1>
        <div className={styles.ad201__search}>
          <SearchBar />
        </div>
        <div className={adcommons.adcommons__table}>
          <Paper sx={{ width: '100%' }}>
            <DataGrid
              rows={currentRows}
              columns={centeredColumns}
              pageSize={rowsPerPage}
              hideFooterPagination={true}  // 페이지네이션 숨기기
              hideFooter={true} 
              onRowClick={handleRowClick}
              sx={{
                border: 0,
                // 셀의 텍스트를 가운데 정렬
                '& .MuiDataGrid-cell': {
                  textAlign: 'center',
                },
                // 행에 마우스를 올렸을 때 커서를 포인터로 변경
                '& .MuiDataGrid-row:hover': {
                  cursor: 'pointer',
                },
              }}
            />
          </Paper>
        </div>
        <Stack spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
          <Pagination
            count={Math.ceil(rows.length / rowsPerPage)} // 총 페이지 수 계산
            page={page}
            onChange={handlePageChange}
            color="secondary"
            />
      </Stack>
  </div>
);

}