'use client';

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styles from '../styles/ad501.module.css'

// 검색창 컴포넌트
function SearchBar() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className={styles.ad501__searchcontainer}>
      {/* 검색 옵션 */}
      <div className={styles.ad501__searchdropdown}>
        <select className={styles.ad501__category} defaultValue="아이디">
          <option value="아이디">약품명</option>
          <option value="이름">제조사명</option>
        </select>
      </div>

      {/* 검색바 */}
      <div className={styles.ad501__searchbar}>
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
  { field: 'id', headerName: 'DB확정나면수정', width: 207 },
  { field: 'Name', headerName: 'DB확정나면수정', width: 207 },
  { field: 'email', headerName: 'DB확정나면수정', width: 400 },
  { field: 'regdate', headerName: 'DB확정나면수정', width: 207 },
  { field: 'level', headerName: 'DB확정나면수정', sortable: false, width: 207 },
];

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
];

export default function DataTable() {
  const [page, setPage] = React.useState(1);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const rowsPerPage = 5;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection.selectionModel); // 체크된 ID 목록 업데이트
  };

  const startIndex = (page - 1) * rowsPerPage;
  const currentRows = rows.slice(startIndex, startIndex + rowsPerPage);

  const isDeleteButtonDisabled = selectedRows.length == 0; // 선택된 항목 없으면 삭제 버튼 비활성화



  return (
    <div className={styles.ad501__container}>
      <h1 className={styles.ad501__title}>안전한 의약생활</h1>
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
              disabled={isDeleteButtonDisabled} // 삭제 버튼 활성화/비활성화
            >
              삭제하기
            </Button>
            <Link href="">
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
            onSelectionModelChange={handleSelectionChange}  // 선택된 항목이 바뀔 때 호출
            selectionModel={selectedRows}  // 선택된 행의 ID를 모델에 반영
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