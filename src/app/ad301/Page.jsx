'use client';

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styles from '../styles/ad301.module.css';
import adcommons from '../styles/adcommons.module.css';
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
    { field: 'Name', headerName: '이름', width: 207 },
    { field: 'email', headerName: '이메일', width: 400 },
    { field: 'regdate', headerName: '최초 가입일', width: 207 },
    { field: 'level', headerName: '등급', width: 207 },
  ];
  
  const rows = [
    { id: 'hong', Name: 'Snow', email: 'hong@naver.com', regdate: '2000.00.00', level: '관리자' },
    { id: 'park', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '관리자' },
    { id: 'kim', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '관리자' },
    { id: 'lee', Name: 'Stark', email: 'hong@naver.com', regdate: '2000.00.00', level: '관리자' },
    { id: 'yoon', Name: 'Targaryen', email: 'hong@naver.com', regdate: '2000.00.00', level: '관리자' },
    { id: 'sdkw', Name: 'Melisandre', email: 'hong@naver.com', regdate: '2000.00.00', level: '관리자' },
    { id: 'asdf', Name: 'Clifford', email: 'hong@naver.com', regdate: '2000.00.00', level: '관리자' },
    { id: 'sadeee', Name: 'Frances', email: 'hong@naver.com', regdate: '2000.00.00', level: '관리자' },
    { id: 'hhhg', Name: 'Roxie', email: 'hong@naver.com', regdate: '2000.00.00', level: '관리자' },
  ];
  

   // 모든 컬럼에 대해 `headerAlign: 'center'`를 동적으로 추가
 const centeredColumns = columns.map(column => ({
  ...column,
  headerAlign: 'center'
}));


  export default function DataTable() {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 5;
    const router = useRouter();


    const handlePageChange =
     (event, value) => {
      setPage(value);
    };

    const handleRowClick = (params) => {
      const { id } = params.row;
      router.push(`/ad301detail?${id}`); // 상세보기 페이지로 이동
    };
  
    // 페이지에 맞게 데이터를 잘라냄
    const startIndex = (page - 1) * rowsPerPage;
    const currentRows = rows.slice(startIndex, startIndex + rowsPerPage);
  
    return (
      <div className={adcommons.adcommons__container}>
        <h1 className={adcommons.adcommons__title}>관리자 관리</h1>
        <div className={styles.ad301__search}>
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