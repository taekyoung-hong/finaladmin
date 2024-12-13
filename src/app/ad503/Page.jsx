'use client';

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styles from '../styles/ad503.module.css';
import Link from 'next/link';
import { useRouter } from "next/navigation";

// 검색창 컴포넌트
function SearchBar() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className={styles.ad503__searchcontainer}>
      {/* 검색 옵션 */}
      <div className={styles.ad503__searchdropdown}>
        <select className={styles.ad503__category} defaultValue="병용금기">
          <option value="병용금기">병용금기 검색하기</option>
          <option value="이름">제조사명</option>
        </select>
      </div>

      {/* 검색바 */}
      <div className={styles.ad503__searchbar}>
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

export default function DataTable() {
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const rowsPerPage = 5;
  const router = useRouter();

  // 데이터 초기화
  React.useEffect(() => {
    // 컬럼 데이터 설정
    setColumns([
      { field: 'id', headerName: 'ID', width: 207 },
      { field: 'Name', headerName: '이름', width: 207 },
      { field: 'email', headerName: '이메일', width: 400 },
      { field: 'regdate', headerName: '등록 날짜', width: 207 },
      { field: 'level', headerName: '레벨', sortable: false, width: 207 },
    ]);

    // 행 데이터 설정
    setRows([
      { id: 'hong', Name: 'Snow', email: 'hong@naver.com', regdate: '2000.00.00', level: '일반' },
      { id: 'park', Name: 'Lannister', email: 'park@naver.com', regdate: '2000.00.00', level: '일반' },
      { id: 'kim', Name: 'Stark', email: 'kim@naver.com', regdate: '2000.00.00', level: '관리자' },
      { id: 'lee', Name: 'Targaryen', email: 'lee@naver.com', regdate: '2000.00.00', level: '일반' },
      { id: 'yoon', Name: 'Melisandre', email: 'yoon@naver.com', regdate: '2000.00.00', level: '관리자' },
      { id: 'choi', Name: 'Clifford', email: 'choi@naver.com', regdate: '2000.00.00', level: '일반' },
      { id: 'jung', Name: 'Frances', email: 'jung@naver.com', regdate: '2000.00.00', level: '일반' },
      { id: 'han', Name: 'Roxie', email: 'han@naver.com', regdate: '2000.00.00', level: '관리자' },
    ]);
  }, []);

  const handleRowClick = (params) => {
    const { id } = params.row;
    router.push(`/ad503detail?id=${id}`); // 상세보기 페이지로 이동
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection.selectionModel); // 체크된 ID 목록 업데이트
  };

  const startIndex = (page - 1) * rowsPerPage;
  const currentRows = rows.slice(startIndex, startIndex + rowsPerPage);

  const isDeleteButtonDisabled = selectedRows.length === 0; // 선택된 항목 없으면 삭제 버튼 비활성화

  return (
    <div className={styles.ad503__container}>
      <h1 className={styles.ad503__title}>안전한 의약생활 - 병용금기 검색하기</h1>
      <div className={styles.ad503__search}>
        <SearchBar />
      </div>
      <div className={styles.ad503__table}>
        <Paper sx={{ width: '100%' }}>
          <div className={styles.ad503__buttoncontainer}>
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
              disabled={isDeleteButtonDisabled} // 삭제 버튼 활성화/비활성화
            >
              삭제하기
            </Button>

            <Link href="ad503write" passHref>
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
            hideFooterPagination={true} // 페이지네이션 숨기기
            hideFooter={true}
            onSelectionModelChange={handleSelectionChange} // 선택된 항목이 바뀔 때 호출
            selectionModel={selectedRows} // 선택된 행의 ID를 모델에 반영
            onRowClick={handleRowClick}
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
