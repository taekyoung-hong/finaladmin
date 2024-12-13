'use client';

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';

import Stack from '@mui/material/Stack';
import styles from '../styles/ad202.module.css'
import { useRouter } from 'next/navigation';

// 검색창 컴포넌트
function SearchBar() {
    const [searchQuery, setSearchQuery] = React.useState("");
   

 

    return (
        <div className={styles.ad202__searchcontainer}>
            {/* 검색 옵션 */}
            <div className={styles.ad202__searchdropdown}>
                <select className={styles.ad202__category} defaultValue="아이디">
                    <option value="아이디">아이디</option>
                    <option value="이름">이름</option>
                    <option value="이메일">이메일</option>
                </select>
            </div>

            {/* 검색바 */}
            <div className={styles.ad202__searchbar}>
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

    { field: 'Name', headerName: '이름', width: 207 },
    { field: 'email', headerName: '이메일', width: 400 },
    { field: 'regdate', headerName: '최초 가입일', width: 207 },
    { field: 'level', headerName: '등급', sortable: false, width: 207 },
];


const rows = [
    { id: 'hong', Name: 'Snow', email: 'hong@naver.com', regdate: '2000.00.00', level: '전문' },
    { id: 'park', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '전문' },
    { id: 'kim', Name: 'Lannister', email: 'hong@naver.com', regdate: '2000.00.00', level: '전문' },
    { id: 'lee', Name: 'Stark', email: 'hong@naver.com', regdate: '2000.00.00', level: '전문' },
    { id: 'yoon', Name: 'Targaryen', email: 'hong@naver.com', regdate: '2000.00.00', level: '전문' },
    { id: 'sdkw', Name: 'Melisandre', email: 'hong@naver.com', regdate: '2000.00.00', level: '전문' },
    { id: 'asdf', Name: 'Clifford', email: 'hong@naver.com', regdate: '2000.00.00', level: '전문' },
    { id: 'sadeee', Name: 'Frances', email: 'hong@naver.com', regdate: '2000.00.00', level: '전문' },
    { id: 'hhhg', Name: 'Roxie', email: 'hong@naver.com', regdate: '2000.00.00', level: '전문' },
];

export default function DataTable() {
   
    const router = useRouter();
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 5;

    const handlePageChange = (event, value) => {
        setPage(value);
    };


    const handleRowClick = (params) => {
        const { id } = params.row;
        router.push(`/ad202_detail`); // 상세보기 페이지로 이동
    };

    // 페이지에 맞게 데이터를 잘라냄
    const startIndex = (page - 1) * rowsPerPage;
    const currentRows = rows.slice(startIndex, startIndex + rowsPerPage);





    return (
        <div className={styles.ad202__container}>
            <h1 className={styles.ad202__title}>전문 회원 관리</h1>
            <div className={styles.ad202__search}>
                <SearchBar />
            </div>
            <div className={styles.ad202__table}>
                <Paper sx={{ width: '100%' }}>
                    <DataGrid
                        rows={currentRows}
                        columns={columns}
                        pageSize={rowsPerPage}
                        checkboxSelection
                        hideFooterPagination={true}  // 페이지네이션 숨기기
                        hideFooter={true}
                        sx={{ border: 0 }}
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