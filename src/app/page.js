"use client"
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import * as React from 'react';
import styles from './styles/page.module.css';

export default function HomePage() {
    const [setqna, setSetQna] = React.useState([]); // qna 불러오기 
    const [setuser, setSetuser] = React.useState([]); // user 불러오기
    const [page, setPage] = React.useState(0);  // 페이지 상태 추가
    const rowsPerPage = 5;
    const startIndex = page * rowsPerPage;
    const currentRows = Array.isArray(setqna) ? setqna.slice(startIndex, startIndex + rowsPerPage) : [];
    const currentRows1 = Array.isArray(setuser) ? setuser.slice(startIndex, startIndex + rowsPerPage) : [];
    const paginationModel = { page: page, pageSize: rowsPerPage };

    // const [qnaData, setQnaData] = useState([]);  // QnA 데이터 상태
    // const [unreadCount, setUnreadCount] = useState(0);  // 알림 숫자 상태
    // const [userData, setUserQnaData] = useState([]);  // QnA 데이터 상태
    // const [user_unreadCount, setUser_UnreadCount] = useState(0);  // 알림 숫자 상태

    // 데이터 가져오기 함수
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // 두 API 요청을 동시에 실행
                const [qnaResponse, userResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/qna_tbl/list'),
                    axios.get('http://localhost:8080/api/user_info_tbl/list')
                ]);

                // 각각의 데이터 상태 업데이트
                if (qnaResponse.data && Array.isArray(qnaResponse.data.data)) {
                    setSetQna(qnaResponse.data.data);
                    // setQnaData(response.data.data);
                    // setUnreadCount(response.data.data.filter(item => item.user_idx === '답변 대기').length); // 답변 대기 글 수 카운트
                }

                if (userResponse.data && Array.isArray(userResponse.data.data)) {
                    setSetuser(userResponse.data.data);
                    // setUserQnaData(response.data.data);
                    // setUser_UnreadCount(response.data.data.filter(item => item.qna_title === '답변 대기').length); // 답변 대기 글 수 카운트
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // 확인시 알림 숫자 0
    const handleNotificationClick = () => {
        setUnreadCount(0);  // 알림 숫자 초기화
    };


    React.useEffect(() => {
        // 서버에서 게시글 수를 가져오기
        axios.get("http://localhost:8080/api/notifications/count")
            .then(response => {
                setNotificationCount(response.data.count); // 서버 응답에 맞춰 카운트 업데이트
            })
            .catch(error => {
                console.error("Failed to fetch notification count:", error);
            });
    }, []);  // 컴포넌트 마운트 시 한 번만 실행

    const handleCheckNotifications = () => {
        setNotificationCount(0);
    };


    return (
        <div className={styles.ad101__container}>
            {/* 그래프 영역 */}
            <div className={styles.ad101__graph}>
                <div className={styles.ad101__graph1}>
                    <h2>Graph 1</h2>
                </div>
                <div className={styles.ad101__graph2}>
                    <h2>Graph 2</h2>
                </div>
            </div>

            {/* 테이블 영역 */}
            <div className={styles.ad101__table}>
                <div className={styles.ad101__table1}>
                    <div className={styles.ad101__table1menu}>
                        <h2 className={styles.ad101__table1title}>회원 관리</h2>
                        <h4 className={styles.ad101__tablemenu}>더보기
                            <span className="material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                        </h4>
                    </div>

                    <Paper>
                        <DataGrid
                            rows={currentRows1} // rows1에서 filteredRows로 수정
                            columns={[
                                { field: 'user_idx', headerName: '회원번호', width: 100 },
                                { field: 'user_id', headerName: '아이디', width: 120 },
                                { field: 'user_name', headerName: '이름', width: 100 },
                                { field: 'user_nickname', headerName: '닉네임', width: 150 },
                                { field: 'user_level_idx', headerName: '등급', sortable: false, width: 120 },
                            ]}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10]}
                            sx={{
                                '& .MuiDataGrid-cell': {
                                    textAlign: 'center', // 모든 셀을 가운데 정렬
                                },
                                '& .MuiDataGrid-columnHeaders': {
                                    textAlign: 'center', // 헤더도 가운데 정렬
                                },
                                '& .MuiDataGrid-columnHeaderTitleContainer': {
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                }

                            }}
                            getRowId={(row) => row.user_idx}  // user_idx를 고유 id로 사용
                            scrollbarSize={0}
                        />
                    </Paper>
                </div>
                <div className={styles.ad101__table2}>
                    <div className={styles.ad101__table2menu}>
                        <h2 className={styles.ad101__table2title}>문의 내역</h2>
                        <h4 className={styles.ad101__tablemenu} style={{ fontSize: '16px' }}>더보기
                            <span className="material-symbols-outlined">
                                keyboard_arrow_right
                            </span>
                        </h4>
                    </div>
                    <Paper>
                        <DataGrid
                            rows={currentRows}
                            columns={[
                                { field: 'qna_title', headerName: '문의 번호', width: 100, align: 'center' },
                                { field: 'qna_question', headerName: '문의 제목', width: 250, align: 'center' },
                                { field: 'qna_q_reg_date', headerName: '문의 일자', width: 100, align: 'center' },
                                {
                                    field: 'qna_answer_stat',
                                    headerName: '답변 여부',
                                    width: 150,
                                    align: 'center',
                                    renderCell: (params) => {
                                        const isAnswered = params.value !== '답변 대기'; // 답변 완료 여부 판단
                                        return (
                                            <span
                                                style={{
                                                    color: isAnswered ? 'green' : 'red', // 답변 완료는 초록색, 대기는 빨간색
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {isAnswered ? '답변 완료' : '답변 대기'}
                                            </span>
                                        );
                                    }
                                },
                            ]}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10]}
                            sx={{
                                '& .MuiDataGrid-cell': {
                                    textAlign: 'center', // 모든 셀을 가운데 정렬
                                },
                                '& .MuiDataGrid-columnHeader': {
                                    textAlign: 'center', // 헤더도 가운데 정렬
                                    justifyContent: 'center',
                                    display: 'flex',
                                },
                                '& .MuiDataGrid-columnHeaderTitleContainer': {
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                }
                            }}
                            getRowId={(row) => row.qna_title}  // user_idx를 고유 id로 사용
                            scrollbarSize={0}
                        />
                    </Paper>
                </div>
            </div>

  
        </div>
    );
}
