'use client';

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styles from '../styles/ad501.module.css';
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
  { field: 'id', headerName: 'ID', width: 207 },
  { field: 'Name', headerName: '이름', width: 207 },
  { field: 'email', headerName: '이메일', width: 400 },
  { field: 'regdate', headerName: '등록 날짜', width: 207 },
  { field: 'level', headerName: '레벨', sortable: false, width: 207 },
];

const rows = [
  { id: 'hong', Name: 'Snow', email: 'hong@naver.com', regdate: '2000-00-00', level: '일반' },
  { id: 'kim', Name: 'Lannister', email: 'kim@naver.com', regdate: '2000-00-00', level: '일반' },
  { id: 'lee', Name: 'Stark', email: 'lee@naver.com', regdate: '2000-00-00', level: '일반' },
];

export default function DataTable() {
  const [page, setPage] = React.useState(1);
  const [selectedRows, setSelectedRows] = React.useState([]); // 선택된 행의 ID를 저장
  const rowsPerPage = 5;
  const router = useRouter(); // useRouter 초기화

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRowClick = (params) => {
    const { id } = params.row;
    router.push(`/ad501detail?id=${id}`); // 상세보기 페이지로 이동
  };

  const handleSelectionModelChange = (newSelection) => {
    // 새로운 선택 모델에서 ID를 배열로 업데이트
    setSelectedRows(newSelection.selectionModel);
    console.log('선택된 행의 ID:', newSelection.selectionModel);
  };

  const handleDelete = () => {
    // 선택된 데이터 삭제 로직
    console.log("삭제할 행 ID:", selectedRows);
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
              onClick={handleDelete}
              disabled={selectedRows.length === 0} // 선택된 데이터가 없으면 비활성화
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
            onSelectionModelChange={(newSelectionModel) =>
              handleSelectionModelChange(newSelectionModel) // 선택 모델 변경 핸들러 추가
            }
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
