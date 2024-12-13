'use client';

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styles from '../styles/ad501.module.css'
import Link from 'next/link';
import { useRouter } from "next/navigation"; // Next.js 13 이상에서 사용

// 검색창 컴포넌트
function SearchBar() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className={styles.ad501__searchcontainer}>
      <div className={styles.ad501__searchdropdown}>
        <select className={styles.ad501__category} defaultValue="아이디">
          <option value="아이디">약품명</option>
          <option value="이름">제조사명</option>
        </select>
      </div>

      <div className={styles.ad501__searchbar}>
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="button">
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>
    </div>
  );
}

const columns = [
  { field: 'id', headerName: 'DB확정나면수정', width: 207 },
  { field: 'Name', headerName: 'DB확정나면수정', width: 207 },
  { field: 'email', headerName: 'DB확정나면수정', width: 400 },
  { field: 'regdate', headerName: 'DB확정나면수정', width: 207 },
  { field: 'level', headerName: 'DB확정나면수정', sortable: false, width: 207 },
];

const rows = [
  { id: 'hong', Name: 'Snow', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
  // 나머지 행...
];

export default function DataTable() {
  const [page, setPage] = React.useState(1);
  
  const rowsPerPage = 5;
  const router = useRouter(); // useRouter 초기화

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRowClick = (params) => {
    const { id } = params.row;
    router.push(`/ad501detail?id=${id}`); // 상세보기 페이지로 이동
  };

  const startIndex = (page - 1) * rowsPerPage;
  const currentRows = rows.slice(startIndex, startIndex + rowsPerPage);

 


  return (
    <div className={styles.ad501__container}>
      <h1 className={styles.ad501__title}>안전한 의약생활 - 의약품 검색하기</h1>
      <div className={styles.ad501__search}>
        <SearchBar />
      </div>
      <div className={styles.ad501__table}>
        <Paper sx={{ width: '100%' }}>
          <div className={styles.ad501__buttoncontainer}>
            <Button
              variant="outlined"
              size="medium"
              sx={{
                backgroundColor: 'white',
                color: '#9C27B0',
                border: '1px solid #9C27B0',
                borderRadius: '42px',
                '&:hover': {
                  backgroundColor: 'secondary.main',
                  color: 'white',
                  border: '1px solid #9e9e9e',
                }
              }}
              disabled={DataTable.length === 0} // 선택된 데이터가 없으면 비활성화
              
            >
              삭제하기
            </Button>

            <Link href="/ad501write" passHref>
              <Button
                variant="outlined"
                size="medium"
                sx={{
                  backgroundColor: 'white',
                  color: '#9C27B0',
                  border: '1px solid #9C27B0',
                  borderRadius: '42px',
                  '&:hover': {
                    backgroundColor: 'secondary.main',
                    color: 'white',
                    border: '1px solid #9e9e9e',
                  }
                }}
              >
                추가하기
              </Button>
            </Link>
          </div>
          <DataGrid
            rows={currentRows}
            columns={columns}
            pageSize={rowsPerPage}
            checkboxSelection
            hideFooterPagination={true}
            hideFooter={true}
            onRowClick={handleRowClick}
          />
        </Paper>
      </div>
      <Stack spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
        <Pagination
          count={Math.ceil(rows.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="secondary"
        />
      </Stack>
    </div>
  );
}
