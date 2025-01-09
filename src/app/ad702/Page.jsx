'use client';

import React from 'react';  // React를 명시적으로 import 해야 함
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styles from '../styles/ad702.module.css';
import adcommons from "../styles/adcommons.module.css";
import { Button } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 검색창 컴포넌트
function SearchBar() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className={adcommons.adcommons__searchcontainer}>
      {/* 검색 옵션 */}
      <div className={adcommons.adcommons__searchdropdown}>
        <select className={adcommons.adcommons__category} defaultValue="제목">
          <option value="제목">제목</option>
          <option value="작성자">작성자</option>
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

export default function DataTable() {
  const [page, setPage] = React.useState(1);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [rows, setRows] = React.useState([]); // 서버에서 가져온 데이터 상태
  const rowsPerPage = 5;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection.selectionModel); // 체크된 ID 목록 업데이트
  };

  const startIndex = (page - 1) * rowsPerPage;
  const currentRows = rows.slice(startIndex, startIndex + rowsPerPage);

  const isDeleteButtonDisabled = selectedRows.length === 0; // 선택된 항목 없으면 삭제 버튼 비활성화

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/fna/list');
      console.log("서버에서 가져온 데이터:", response.data);

      if (response.data && Array.isArray(response.data.data)) {
        setRows(response.data.data);
      }
    } catch (error) {
      console.log("데이터를 가져오지 못했습니다", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []); // 컴포넌트가 마운트될 때 데이터 로드

  const router = useRouter();

  const handleRowClick = (params) => {
    console.log("click");
    const { fna_idx } = params.row;
    router.push(`/ad702detail?fna_idx=${fna_idx}`);
  }



  return (
    <div className={adcommons.adcommons__container}>
      <h1 className={adcommons.adcommons__title}>자주 묻는 질문 관리</h1>
      <div className={styles.ad702__search}>
        <SearchBar />
      </div>
      <div className={adcommons.adcommons__table}>
        <Paper sx={{ width: '100%' }}>
          <div className={adcommons.adcommons__buttoncontainer}>
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

            <Link href="/ad701write" passHref>
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
            columns={[
              { field: 'fna_idx', headerName: '번호', width: 207 },
              { field: 'admin_idx', headerName: '작성자 아이디', width: 207 },
              { field: 'fna_question', headerName: '질문', width: 400 },
              { field: 'fna_answer', headerName: '답변', width: 400 },
              { field: 'fna_reg_date', headerName: '작성일', width: 207 },
              { field: 'fna_up_date', headerName: '업데이트일', width: 207 },
            ]}
            pageSize={rowsPerPage}
            checkboxSelection
            hideFooterPagination={true} // 페이지네이션 숨기기
            hideFooter={true}
            onSelectionModelChange={handleSelectionChange}  // 선택된 항목이 바뀔 때 호출
            selectionModel={selectedRows}  // 선택된 행의 ID를 모델에 반영
            sx={{
              // 셀의 텍스트를 가운데 정렬
              '& .MuiDataGrid-cell': {
                textAlign: 'center',
              },
            }}
            getRowId={(row) => row.fna_idx} // 고유한 ID를 반환
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
