 class Testwith {
    constructor(service_id) {

        this.server = false ? 'https://www.testwith.co.kr' : 'http://localhost:8888';

        this.service_id = service_id;
        this.scriptLoaded = false; // 스크립트 준비

        // 스트리밍
        this.streamSession = null;
        this.stream_info = { a: false, b: false, c: false };
        this.publishers = { 'stream': null, 'screen': null }; // 퍼블리셔 정보
        this.cameraElement = null; // 카메라 공유 요소 위치
        this.screenElement = null; // 화면 공유 요소 위치
        this.qrElement = null // QR 코드 요소 위치
        this.streamOn = false; // 웹캠 스트리밍 상태
        this.screenOn = false; // 화면 스트리밍 상태
        this.mstream_on = false; // 모바일 스트리밍 상태

        // 등록
        this.registElement = null; // 얼굴등록 요소 위치

        // 녹화
        this.recordStreams = { p: null, s: null }
        this.upload_state = {
            'uploading' : 1,
            'uploaded' : 1,
            'average' : 0,
        }; // 녹화 영상 업로드 상태

        // 화면 AI감독
        this.screenDetectOption = {
            screenLeave : false,
            rightClick : false,
            specialKey : false,
        }
        this.screenRecordOption = false;
        this.cheatAction = {
            "우클릭": 1,
            "화면이탈": 1,
            "특수키": 1,
        }

        // 얼굴 AI감독
        this.info_container = {
            canvas_w: this.v_size,
            canvas_h: this.v_size,
            dev_w: window.outerWidth,
            dev_h: window.outerHeight,
            alpha: 0,
            beta: 90,
            gamma: 0,
            FL: [],
        };

        this.faceDetectOption = {
            existFace : false,
            multiFace : false,
            validFace : false,
            gaze : false,
        }
        this.faceRecordOption = false;

        this.AI_videoElement = null;
        this.faceAI = null;
        this.AIcamera = null;
        this.AIcamera_start = false;
        this.v_size = 480;

        // 채팅
        this._created_noticeId = [];
        this._created_studentId = [];
        this._created_assistId = [];
        this._created_signalId = [];
        this.chatElement = null;

        // 언어
        this.lang_dict = {
            'kr' : {
                '카메라시작' : '카메라 공유를 시작합니다.',
                '시_작' : '시 작',
                '카메라선택' : '카메라 선택',
                '마이크선택' : '마이크 선택',
                '확인' : '확인',
                '마이크없음': '마이크없음',
                '화면시작' : '화면 공유를 시작합니다.',
                '공유사진' : '<img id="tw_screen_guide_img" class="testwith_d-none" src="https://testwith.co.kr/static/dmImg/screen_share.png"></img>',
                '확장필요' : '화면공유를 위해 테스트위드 확장프로그램 설치가 필요합니다.',
                '설치이동' : '확장프로그램 설치 페이지로 이동하시겠습니까?',
                '저장중' : '저장중...',
                '연결중' : '연결 중...',
                '시선조정' : '시선 조정',
                '시선조정안내' : '[시선 조정] 버튼을 클릭하고 바른 자세로 화면 중앙을 ${timeleft}초간 바라보세요.',
                '시선자세' : '잘못된 자세로 시선 조정을 하면 시험 중 부정행위로 감지됩니다',
                '시선추적안내' : '시선 추적 중입니다. <br />계속 응시해 주세요.',
                '미검출알림' : '얼굴이 미검출 되었습니다. 시선을 재추적해주세요.',
                '익명': '익명',
                '출제자': '출제자',
                '감독관': '감독관',
                '시간출력': (month, date) => `${month}월 ${date}일`,
                '새메세지': '새로운 메시지가 도착했습니다.',
                '응시자문의': '응시자 문의',
                '문의': '문의',
                '내용입력': '    내용을 입력해주세요',
                '내용로드': '내용 불러오기 중',
            },
            'en' : {
                '카메라시작' : ' Start webcam sharing.',
                '시_작' : 'Start',
                '카메라선택' : 'Select camera',
                '마이크선택' : 'Select mic',
                '확인' : 'Confirm',
                '마이크없음':'No microphone',
                '화면시작' : 'Starting screen sharing.',
                '공유사진' : '<img id="tw_screen_guide_img" class="testwith_d-none" src="https://testwith.co.kr/static/dmImg/screen_share.png"></img>',
                '확장필요' : 'Extension installation required for screen sharing.',
                '설치이동' : 'Would you like to go to the extension installation page?',
                '저장중' : 'Saving...',
                '연결중' : 'Connect...',
                '시선조정' : 'Optimize',
                '시선조정안내' : 'Click the [Eye optimize] button and <br/> look at the center of the screen for ${timeleft} seconds.',
                '시선자세' : 'If you track your eyes in the wrong position, it will be detected as cheating during the test',
                '시선추적안내' : 'Tracking. <br />Keep staring.',
                '미검출알림' : 'Your face was not detected. Please re-track your gaze.',
                '익명': 'Anonymous',
                '출제자' : 'Examiner',
                '감독관' : 'Supervisor',
                '시간출력': (month, date) => `${month}/${date}`,
                '새메세지': 'New message has arrived.',
                '응시자문의': 'Inquiry',
                '문의': 'Send',
                '내용입력': 'Enter contents',
                '내용로드': 'Loading content',
            },
            'jp' : {
                '카메라시작' : 'カメラの共有を始めます。',
                '시_작' : '始まり',
                '카메라선택' : 'カメラ選択',
                '마이크선택' : 'マイクの選択',
                '확인' : '確認',
                '마이크없음':'マイクなし',
                '화면시작' : '画面共有を開始します。',
                '공유사진' : '<img id="tw_screen_guide_img" class="testwith_d-none" src="https://testwith.co.kr/static/dmImg/screen_share.png"></img>',
                '확장필요' : '画面共有には拡張機能のインストールが必要です。',
                '설치이동' : '拡張機能のインストールページに進みますか？',
                '저장중' : '保存中...',
                '연결중' : '接続中···',
                '시선조정' : '視線追跡',
                '시선조정안내' : '[視線追跡] ボタンをクリックし、正しい姿勢で画面中央を 5 秒間見つめてください。',
                '시선자세' : '間違った姿勢で視線追跡をすると、試験中に不正行為として感知されます',
                '시선추적안내' : '追跡中です。 <br />引き続きご受験ください。',
                '미검출알림' : '顔が検出されませんでした。 視線を再追跡してください。',
                '익명': '匿名',
                '출제자' : '出題者',
                '감독관' : '試験監督',
                '시간출력': (month, date) => `${month}月 ${date}日`,
                '새메세지': '新着メッセージがあります。',
                '응시자문의': '問い合わせ内訳',
                '문의': '検索',
                '내용입력': '内容入力',
                '내용로드': 'コンテンツの読み込み中',
            },
        }

        // 정보 함수
        this.loadTestwith.bind(this);
        this.getTestCenterList.bind(this);
        this.getTestCenter.bind(this);
        this.createTestCenter.bind(this);
        this.updateTestCenter.bind(this);
        this.getStudentList.bind(this);
        this.getStudent.bind(this);
        this.registerStudent.bind(this);
        this.updateStudent.bind(this);

        // 기능 함수
        this.createQR_code.bind(this);
        this.createWebcam.bind(this);
        this.createScreen.bind(this);
        this.stream_start.bind(this);
        this.connectAI.bind(this);
        this.createRegister.bind(this);
        this.registFace.bind(this);
        this.setScreenAI.bind(this);
        this.setFaceAI.bind(this);
        this.createGazeOptimize.bind(this);
        this.gazeOptimize.bind(this);
    }

    // 스크립트, 스타일 호출
    loadTestwith() {
        return new Promise((resolve, reject) => {
            const import_list = [
                'https://www.testwith.co.kr/static/js/qrcode.js',
                'https://www.testwith.co.kr/static/js/student_module/student_test/camera_utils.js',
                'https://www.testwith.co.kr/static/js/student_module/student_test/focus_prepare.js',
                'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js',
                "https://static.opentok.com/v2/js/opentok.min.js",
                "https://asset.talkplus.io/npm/talkplus-0.4.5",
            ];
    
            let import_cnt = 0;
            import_list.forEach(script_src => {
                const script = document.createElement('script');
                script.src = script_src;
                script.onload = () => {
                    import_cnt++;

                    if (script.src == 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js') {
                        this.faceAI = new FaceMesh({
                        locateFile: (file) =>
                            `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/${file}`
                        });
                        this.faceAI.setOptions({
                            maxNumFaces: 2,
                            refineLandmarks: true,
                            minDetectionConfidence: 0.5,
                            minTrackingConfidence: 0.5,
                        });
                    }

                    if (import_cnt >= 5) {
                        this.scriptLoaded = true;
                        resolve();
                    }
                };
                document.head.appendChild(script);
            });
    
            const css_list = [
                `${this.server}/static/style/testwith_api.css?ver=7.04`,
                'https://www.testwith.co.kr/static/fontawesome/css/fontawesome.css?ver=7.04',
                'https://www.testwith.co.kr/static/fontawesome/css/brands.css?ver=7.04',
                'https://www.testwith.co.kr//static/fontawesome/css/solid.css?ver=7.04',
            ];
    
            css_list.forEach(css_src => {
                const api_css = document.createElement('link');
                api_css.href = css_src;
                api_css.rel = 'stylesheet';
                api_css.type = 'text/css';
                document.head.appendChild(api_css);
            });

        });
        
    }

    // error 처리 함수
    handleErrorResponse = (statusCode, key='') => {``
        const codeDict = {
            // 1000
            '1001' : 'TooManyRequests',
            '1002' : `InvalidParams: ${key} is required.`,
            '1003' : 'TestwithScriptRequired: Testwith script is not loaded. Run loadTestwith first.',
            '1004' : `ParamsBindingError: ${key} must be an array.`,
            '1005' : 'UserNumsNamesLengthDoNotMatch: userNums and names must be the same length.',
            '1006' : 'NoScreenStreaming: Run createScreen first.',
            '1007' : 'CameraDisconnected: Connect camera first.',

            // 2000
            '2001' : 'TimestampExpired',
            '2002' : 'TestCenterNotFound',
            '2003' : 'TestCenterCreationFail',
            '2004' : 'TestCenterUpdateFail',
            '2005' : 'UserRegistrationFail',
            '2006' : 'UserNumTaken',
            '2007' : 'UserUpdateFail',
            '2008' : 'UserNotFound',

            // 3000
            '3001' : 'InvalidImageFormat',
            '3002' : 'FileUploadFail',
            '3003' : 'FileNotFound',
            '3004' : 'FaceNotDetected',
            '3005' : 'MultipleFaceDetection',
            '3006' : 'NoStoredPhoto',
            '3007' : 'NoFaceInStoredFile',
            '3008' : 'VerificationMismatch',
            '3009' : 'InvalidFileName',
            '3010' : 'TokenExpired',
            '3011' : 'InvalidToken',
            '3012' : 'Unauthorized',
            '3013' : 'ServiceIdNotFound',
            '3014' : 'InvalidTagName',
            '3015' : 'InvalidVideoRatio',
            '3016' : 'VideoElementNotFound',
        }
        return {"resultCode": statusCode, "resultMsg": codeDict[statusCode]};
    }

    // 시험장 목록 조회
    // token : 서버로 요청하여 수신받은 TestWith 토큰값
    // parameter = {token : ''}
    // => [{id : '', testId : '', title : ''}, ...]
    async getTestCenterList(parameter) {
        parameter = parameter || {};

        if (!parameter.token) return this.handleErrorResponse(1002, 'token');

        const token = parameter.token;
        const timestamp = new Date().getTime();

        try {
            const response = await fetch(`${this.server}/services/${this.service_id}/testcenters`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'timestamp': timestamp,
                    'Authorization': "Bearer " + token,
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    // 시험장 정보 조회
    // token : 서버로 요청하여 수신받은 TestWith 토큰값
    // testId : API로 생성한 각 시험장 고유번호
    // parameter = {token : '', testId: ''}
    // => {id : '', testId : '', title : ''}
    async getTestCenter(parameter) {
        parameter = parameter || {};

        if (!parameter.token) return this.handleErrorResponse(1002, 'token');
        if (!parameter.testId) return this.handleErrorResponse(1002, 'testId');

        const token = parameter.token;
        const testId = parameter.testId;
        const timestamp = new Date().getTime();

        try {
            const response = await fetch(`${this.server}/services/${this.service_id}/testcenters/${testId}`, { 
                method: "GET",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'timestamp': timestamp,
                    'Authorization': "Bearer " + token,
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    // 시험장 생성
    // token : 서버로 요청하여 수신받은 TestWith 토큰값
    // title : API로 생성할 시험장 제목
    // parameter = {token : '', title: ''}
    // => {resultCode : '', resultMsg : '', testId : ''}
    async createTestCenter(parameter) {
        parameter = parameter || {};
        if (!this.scriptLoaded) return this.handleErrorResponse(1003);
        if (!parameter.token) return this.handleErrorResponse(1002, 'token');
        if (!parameter.title) return this.handleErrorResponse(1002, 'title');
        const token = parameter.token;
        const title = parameter.title;
        const timestamp = new Date().getTime();

        try {
            const response = await fetch(`${this.server}/services/${this.service_id}/testcenters`, {  
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'timestamp': timestamp,
                    'Authorization': "Bearer " + token
                },
                body: JSON.stringify({
                    'title': title
                })
            });
            const data = await response.json();

            // 시험장 채팅채널 생성
            if (data.result.resultCode != 401) {
                window.client = new TalkPlus.Client({appId: data.talk});
                await this._loginTalkPlus(String(timestamp));
                await this._create_notice_channel(timestamp);
                await this._create_signal_channel(timestamp);
            }
            return data.result;

        } catch (error) {
            throw error; 
        }
    }

    // 시험장 수정
    // token : 서버로 요청하여 수신받은 TestWith 토큰값
    // testId : API로 생성한 각 시험장 고유번호
    // title : 수정할 시험장 제목
    // parameter = {token : '', testId: '', title: ''}
    // => {resultCode : '', resultMsg : ''}
    async updateTestCenter(parameter) {
        parameter = parameter || {};

        if (!parameter.token) return this.handleErrorResponse(1002, 'token');
        if (!parameter.testId) return this.handleErrorResponse(1002, 'testId');
        if (!parameter.title) return this.handleErrorResponse(1002, 'title');

        const token = parameter.token;
        const testId = parameter.testId;
        const title = parameter.title;
        const timestamp = new Date().getTime();

        try {
            const response = await fetch(`${this.server}/services/${this.service_id}/testcenters/${testId}`, {  
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'timestamp': timestamp,
                    'Authorization': "Bearer " + token,
                },
                body: JSON.stringify({
                    'title': title
                })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw error; 
        }
    }

    
    // 응시자 목록 조회
    // token : 서버로 요청하여 수신받은 TestWith 토큰값
    // testId : API로 생성한 각 시험장 고유번호
    // parameter = {token : '', testId: ''}
    // => [{resultCode, resultMsg, idx, testId, userNum, name, email, face, assist, confirmed, audioId, deviceId, mstream, screen, stream}, ...]
    async getStudentList(parameter) {
        parameter = parameter || {};

        if (!parameter.token) return this.handleErrorResponse(1002, 'token');
        if (!parameter.testId) return this.handleErrorResponse(1002, 'testId');
        
        const token = parameter.token;
        const testId = parameter.testId;
        const timestamp = new Date().getTime();

        try {
            const response = await fetch(`${this.server}/services/${this.service_id}/testcenters/${testId}/students`, {  
                method: "GET",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'timestamp': timestamp,
                    'Authorization': "Bearer " + token,
                }
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            throw error; 
        }
    }

    // 응시자 정보 조회
    // token : 서버로 요청하여 수신받은 TestWith 토큰값
    // testId : API로 생성한 각 시험장 고유번호
    // userId : 응시자 고유번호
    // parameter = {token : '', testId: '', userId: ''}
    // => {resultCode, resultMsg, idx, testId, userNum, name, email, face, assist, confirmed, audioId, deviceId, mstream, screen, stream}
    async getStudent(parameter) {
        parameter = parameter || {};

        if (!parameter.token) return this.handleErrorResponse(1002, 'token');
        if (!parameter.testId) return this.handleErrorResponse(1002, 'testId');
        if (!parameter.userId) return this.handleErrorResponse(1002, 'userId');

        const token = parameter.token;
        const testId = parameter.testId;
        const userId = parameter.userId;
        const timestamp = new Date().getTime();

        try {
            const response = await fetch(`${this.server}/services/${this.service_id}/testcenters/${testId}/students/${userId}`, {  
                method: "GET",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'timestamp': timestamp,
                    'Authorization': "Bearer " + token,
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw error; 
        }
    }
    
    // 응시자 등록
    // token : 서버로 요청하여 수신받은 TestWith 토큰값
    // testId : API로 생성한 각 시험장 고유번호
    // userNums : 응시자 학번
    // names : 응시자 이름
    // parameter = {token : '', testId: '', userNums: ['', ...], names: ['', ...]}
    // => [idx, ...]
    async registerStudent(parameter) {
        if (!this.scriptLoaded) return this.handleErrorResponse(1003);

        parameter = parameter || {};
        if (!parameter.token) return this.handleErrorResponse(1002, 'token');
        if (!parameter.testId) return this.handleErrorResponse(1002, 'testId');

        if (!parameter.userNums) return this.handleErrorResponse(1002, 'userNums');
        if (!parameter.names) return this.handleErrorResponse(1002, 'names');

        if (!Array.isArray(parameter.userNums)) return this.handleErrorResponse(1004, 'userNums');
        if (!Array.isArray(parameter.names)) return this.handleErrorResponse(1004, 'names');
        if (parameter.userNums.length != parameter.names.length) return this.handleErrorResponse(1005);
    
        const token = parameter.token;
        const testId = parameter.testId;
        const timestamp = new Date().getTime();
        const userNums = parameter.userNums;
        const names = parameter.names;

        try {
            const response = await fetch(`${this.server}/services/${this.service_id}/testcenters/${testId}/students`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'timestamp': timestamp,
                    'Authorization': "Bearer " + token,
                },
                body: JSON.stringify({
                    'userNums': userNums,
                    'names': names
                })
            });
    
            const data = await response.json();

            // 응시자 채팅채널 생성
            if (data.result.resultCode == 201) {
                window.client = new TalkPlus.Client({appId: data.talk});
                await this._loginTalkPlus(testId);

                let i = 0;
                const max_i = data.result.resultData.length;
                const create_channel = async () => {
                    await this._create_student_channel(data.result.resultData[i], testId);
                    i++;
                    if (max_i > i) {
                        setTimeout(create_channel, 500);
                    } else {
                        console.log(data.result);
                        return data.result;
                    }
                }
                setTimeout(create_channel, 500);
            } else {
                
                console.log(data.result);
                return data.result;
            }
        } catch (error) {
            throw error;
        }
    }

    // 응시자 이름 수정
    // token : 서버로 요청하여 수신받은 TestWith 토큰값
    // testId : API로 생성한 각 시험장 고유번호
    // userId : 응시자 고유번호
    // userNum : 응시자 학번
    // name : 응시자 이름
    // parameter = {token : '', testId: '', userId: '', userNum: '', name: ''}
    async updateStudent(parameter) {
        parameter = parameter || {};
        
        if (!parameter.token) return this.handleErrorResponse(1002, 'token');
        if (!parameter.testId) return this.handleErrorResponse(1002, 'testId');
        if (!parameter.userId) return this.handleErrorResponse(1002, 'userId');
        if (!parameter.userNum) return this.handleErrorResponse(1002, 'userNum');
        if (!parameter.name) return this.handleErrorResponse(1002, 'name');

        const token = parameter.token;
        const testId = parameter.testId;
        const userId = parameter.userId;
        const userNum = parameter.userNum;
        const name = parameter.name;
        const timestamp = new Date().getTime();

        try {
            const response = await fetch(`${this.server}/services/${this.service_id}/testcenters/${testId}/students/${userId}`, {  
                method: "POST",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'timestamp': timestamp,
                    'Authorization': "Bearer " + token,
                },
                body: JSON.stringify({
                    'userNum': userNum,
                    'name': name
                })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw error; 
        }
    }

    // 기능 1. 웹 카메라 공유 UI 생성
    // langKey : 언어 선택 [kr : 한국어(기본값), en : 영어, jp : 일본어]
    // elementId : 웹캠 스트리밍 UI를 출력할 Element의 ID (기본값 : body에 추가)
    // userId : 응시자 고유번호 (필수)
    // parameter = {langKey : 'kr', elementId : '', userId : ''}
    createWebcam(parameter) {
        if (!this.scriptLoaded) return this.handleErrorResponse(1003);

        parameter = parameter || {};
        const langKey = parameter.langKey || 'kr';
        const elementId = parameter.elementId || '';
        const userId = parameter.userId || '';
        if (userId === '') return this.handleErrorResponse(1002, 'userId');

        if (this.cameraElement) this.cameraElement.parentNode.removeChild(this.cameraElement);
        let modalElement = document.getElementById(elementId);
        if (!modalElement) {
            modalElement = document.createElement('div');
            document.body.appendChild(modalElement);
        }
        this.cameraElement = modalElement;

        modalElement.innerHTML = `
            <div class="testwith_streamDiv testwith_innerdiv">
                <div class="btn-box testwith_innerdiv" id="testwith_btn-box_stream">
                    <h3>${this.lang_dict[langKey]['카메라시작']}</h3>
                    <button type="button" id="tw_publish_start" class="btn btn-primary">${this.lang_dict[langKey]['시_작']}</button>
                </div>
            
                <div class="testwith_video-box testwith_innerdiv testwith_d-none" id="testwith_video-box_stream">
                    <div id="testwith_selectDiv" class="testwith_innerdiv testwith_d-none">
                        <p id="tw_selTxt" class="testwith_d-none">${this.lang_dict[langKey]['카메라선택']}</p>
                        <select id="tw_selVal" class="testwith_d-none" name="camList"></select>
                        <p id="tw_selTxt2" class="testwith_d-none">${this.lang_dict[langKey]['마이크선택']}</p>
                        <select id="tw_selVal2" class="testwith_d-none" name="micList"></select>
                        <button id="tw_selCam" class="testwith_d-none">${this.lang_dict[langKey]['확인']}</button>
                    </div>
                    <div class="testwith_innerdiv" id="tw_stream_publisher"></div>
                </div>
            </div>
        `;
        modalElement.style = "display: block; width: 100%; height: 100%; margin: auto;";

        let selFlag = 0; // 카메라 선택 여부

        const selectCam = async() => {
            selFlag = 1;
            const selectDiv = document.getElementById('testwith_selectDiv');
            selectDiv.style.backgroundColor = '';
            document.getElementById('tw_selTxt').classList.add('testwith_d-none');
            document.getElementById('tw_selTxt2').classList.add('testwith_d-none');
            document.getElementById('tw_selCam').classList.add('testwith_d-none');

            const selVal = document.getElementById('tw_selVal');
            const selVal2 = document.getElementById('tw_selVal2');
        
            selVal.classList.add('testwith_d-none');
            selVal2.classList.add('testwith_d-none');
        
            if (this.publishers.stream) {
                selectDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                this.publishers.stream.setVideoSource(selVal.value).then(() => {
                    if (selVal2.value) {
                        this.publishers.stream.setAudioSource(selVal2.value).then(() => {
                            selectDiv.style.backgroundColor = '';
                        }).catch(error => {
                            console.error('aud', error.name);
                            selectDiv.style.backgroundColor = '';
                        });
                    } else {
                        selectDiv.style.backgroundColor = '';
                    }
                }).catch(error => {
                    console.error(error.name);
                    document.getElementById(`testwith_btn-box_stream`).classList.remove('testwith_d-none');
                    document.getElementById(`testwith_video-box_stream`).classList.add('testwith_d-none');
                    this.publishers.stream = null;
                    this.streamOn = false;
                    this.onFailStream();
                });
            } else {
                const publish_parameter = {
                    userId : userId,
                    videoSource : selVal.value,
                    audioSource : selVal2.value === 'null' ? null : selVal2.value,
                    type : 'stream',
                    elementId : 'tw_stream_publisher',
                }
                this.stream_start(publish_parameter);
            }
        }

        const selectToggle = async() => {
            const selectDiv = document.getElementById('testwith_selectDiv');
            if (selFlag === 0 && selectDiv.style.backgroundColor === '') {
                navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(() => {
                    const select = document.getElementById('tw_selVal');
                    const select2 = document.getElementById('tw_selVal2');
                    select.style.padding = '200px;'
                    select.innerHTML = '';

                    OT.getDevices((error, devices) => {
                        if (error) {
                            console.error(error.message);
                            console.error(error.name);
                            document.getElementById('testwith_btn-box_stream').classList.remove('testwith_d-none');
                            document.getElementById('testwith_video-box_stream').classList.add('testwith_d-none');
                            this.publishers.stream = null;
                            selFlag = 0;
                            this.onFailStream();
                            return;
                        }

                        select.innerHTML = '';
                        select2.innerHTML = '';
            
                        let selectedSource = 0;
                        let selectedAudSource = 0;
        
                        if (this.publishers.stream) {
                            const source = this.publishers.stream.getVideoSource();
                            selectedSource = source.deviceId;
        
                            const audSource = this.publishers.stream.getAudioSource();
                            selectedAudSource = audSource ? audSource.label : '';
                        }
                        
                        const videoInputDevices = devices.filter(e => e.kind == "videoInput");
                        if (videoInputDevices.length !== 0) {
                            videoInputDevices.forEach(d => {
                                const option = document.createElement('option');
                                option.innerText = d.label;
                                option.value = d.deviceId;
                                if (this.publishers.stream) {
                                    if(selectedSource === d.deviceId) option.selected = true;
                                }
                                select.append(option);
                            });
                        } else {
                            console.log('카메라에 접근할 수 없습니다.');
                            this.publishers.stream = null;
                            this.streamOn = false;
                            selFlag = 0;
                            this.onFailStream();
                            return;
                        }
        
                        const audioInputDevices = devices.filter(e => e.kind == "audioInput");
                        if (audioInputDevices.length !== 0) {
                            audioInputDevices.forEach(d => {
                                const option = document.createElement('option');
                                if (d.deviceId) {
                                    option.innerText = d.label;
                                    option.value = d.deviceId;
                                    if (this.publishers.stream) {
                                        if(selectedAudSource === d.label) option.selected = true;
                                    }
                                } else {
                                    option.innerText = this.lang_dict[langKey]['마이크없음'];
                                    option.value = null;
                                }
                                select2.append(option);
                            });
                        } else {
                            const option = document.createElement('option');
                            option.innerText = this.lang_dict[langKey]['마이크없음'];
                            option.value = null;
                            select2.append(option);
                        }
                        document.getElementById('tw_selCam').classList.remove('testwith_d-none');
                    });

                    selectDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                    document.getElementById('tw_selTxt').classList.remove('testwith_d-none');
                    document.getElementById('tw_selTxt2').classList.remove('testwith_d-none');
                    select.classList.remove('testwith_d-none');
                    select2.classList.remove('testwith_d-none');

                }).catch(err => {
                    if (err) {
                        console.error(err.message);
                        console.error(err.name);
                        this.publishers.stream = null;
                        this.streamOn = false;
                        document.getElementById('testwith_btn-box_stream').classList.remove('testwith_d-none');
                        document.getElementById('testwith_video-box_stream').classList.add('testwith_d-none');
                        this.onFailStream();
                    }
                });

            } else {
                selFlag = 0;
            }
        }

        const publish_start = () => {
            document.getElementById('testwith_btn-box_stream').classList.add('testwith_d-none');
            document.getElementById('testwith_video-box_stream').classList.remove('testwith_d-none');
            document.getElementById('testwith_selectDiv').classList.remove('testwith_d-none');
            selectToggle();
        }

        const tw_publish_start = document.getElementById('tw_publish_start');
        tw_publish_start.removeEventListener('click', publish_start);
        tw_publish_start.addEventListener('click', publish_start);

        const tw_select_toggle = document.getElementById('testwith_selectDiv');
        tw_select_toggle.removeEventListener('click', selectToggle);
        tw_select_toggle.addEventListener('click', selectToggle);

        const tw_select_cam = document.getElementById('tw_selCam');
        tw_select_cam.removeEventListener('click', selectCam);
        tw_select_cam.addEventListener('click', selectCam);
    }

    // 카메라공유 성공 또는 실패 시 실행 함수
    onSuccessStream = () => console.log('카메라공유 완료');
    onFailStream = () => console.log('카메라공유 실패');

    // 기능 2. 스크린공유 UI 생성
    // langKey : 언어 선택 [kr : 한국어(기본값), en : 영어, jp : 일본어]
    // elementId : 웹캠 스트리밍 UI를 출력할 Element의 ID (기본값 : body에 추가)
    // userId : 응시자 고유번호 (필수)
    // parameter = {langKey : 'kr', elementId : '', userId : ''}
    createScreen(parameter) {
        if (!this.scriptLoaded) return this.handleErrorResponse(1003);
       
        parameter = parameter || {};
        const langKey = parameter.langKey || 'kr';
        const elementId = parameter.elementId || '';
        const userId = parameter.userId || '';

        if (userId === '') return this.handleErrorResponse(1002, 'userId');
           
        if (this.screenElement) this.screenElement.parentNode.removeChild(this.screenElement);
        
        let modalElement = document.getElementById(elementId);
        if (!modalElement) {
            modalElement = document.createElement('div');
            document.body.appendChild(modalElement);
        }

        this.screenElement = modalElement;

        modalElement.innerHTML = `
            <div class="testwith_streamDiv testwith_innerdiv">
                <div class="btn-box testwith_innerdiv" id="testwith_btn-box_screen">
                    <h3 style="text-align: center; word-break: keep-all;">${this.lang_dict[langKey]['화면시작']}</h3>
                    <button type="button" id="tw_publish_screen" class="btn btn-primary">${this.lang_dict[langKey]['시_작']}</button>
                </div>
                <div class="btn-box testwith_innerdiv testwith_d-none" id="testwith_btn-box_extension_alarm">
                    <h3 >${this.lang_dict[langKey]['확장필요']}</h3>
                    <p stylle="color: white;">${this.lang_dict[langKey]['설치이동']}</p>
                    <p>https://chrome.google.com/webstore/detail/testwith-extension/kdibobcgpeckcemhemaffphbfbonamch</p>
                </div>

                <div class="testwith_video-box testwith_innerdiv testwith_d-none" id="testwith_video-box_screen">
                    <div class="testwith_innerdiv" id="tw_screen_publisher"></div>
                </div>
                ${this.lang_dict[langKey]['공유사진']}
            </div>
        `;
        modalElement.style = "display: block; width: 100%; height: 100%; margin: auto;"

        const shareScreen = () => {
            const screen_guide_img = document.getElementById('tw_screen_guide_img');
            const btnBox = document.getElementById('testwith_btn-box_screen');
            const videoBox = document.getElementById('testwith_video-box_screen');

            screen_guide_img.classList.remove('testwith_d-none');
            btnBox.classList.add('testwith_d-none');
            videoBox.classList.remove('testwith_d-none');

            navigator.mediaDevices.getDisplayMedia({
                audio: false,
                video: { displaySurface: 'monitor' }
            }).then(stream => {
                screen_guide_img.classList.add('testwith_d-none');

                const publish_parameter = {
                    userId : userId,
                    videoSource : stream.getVideoTracks()[0],
                    audioSource : null,
                    type : 'screen',
                    elementId : 'tw_screen_publisher',
                }
                this.stream_start(publish_parameter);

            }).catch((err) => {
                console.log('스크린 연결 실패', err);
                screen_guide_img.classList.add('testwith_d-none');
                videoBox.classList.add('testwith_d-none');
                btnBox.classList.remove('testwith_d-none');
                this.onFailScreen();
            });
        }

        const tw_publish_screen = document.getElementById('tw_publish_screen');
        tw_publish_screen.removeEventListener('click', shareScreen);
        tw_publish_screen.addEventListener('click', shareScreen);
    }

    // 화면공유 성공 또는 실패 시 실행 함수
    onSuccessScreen = () => console.log('화면공유 완료');
    onFailScreen = () => console.log('화면공유 실패');

    // 기능 3. QR 코드 생성
    // langKey : 언어 선택 [kr : 한국어(기본값), en : 영어, jp : 일본어]
    // elementId : QR코드를 출력할 Element 위치 Element ID 입력 (기본값 : body에 자동 요소 추가)
    // userId : 응시자 고유번호
    // width : QR 코드의 너비 (정수, 기본값 : 198)
    // height : QR 코드이 높이 (정수, 기본값 : 198)
    // parameter = {langKey : 'kr', elementId : '', userId : '', width : 198, height : 198}
    createQR_code(parameter) {
        if (!this.scriptLoaded) return this.handleErrorResponse(1003);

        parameter = parameter || {};
        const langKey = parameter.langKey || 'kr';
        const elementId = parameter.elementId || '';
        const userId = parameter.userId || '';
        const width = parameter.width || 198;
        const height = parameter.height || 198;

        if (userId === '') return this.handleErrorResponse(1002, 'userId');

        const l = (langKey === "kr") ? "" : langKey + "_";
        const code = Math.random().toString(36);
        const a = code.slice(2, 7);
        const b = code.slice(7, 9);

        let qrElement = document.getElementById(elementId);
        if (!qrElement) {
            if (this.qrElement) this.qrElement.parentNode.removeChild(this.qrElement);
            qrElement = document.createElement('div');
            qrElement.classList.add('testwith_qrcode');
            document.body.appendChild(qrElement);
        }
        this.qrElement = qrElement;

        const qrCodeOptions = {
            text: `https://testwith.co.kr/${l}testWith_QR_v/id=${a}${userId}${b}`,
            width: width,
            height: height,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        };

        const qrcode = new QRCode(qrElement, qrCodeOptions);
        qrcode.clear();
        qrcode.makeCode(`https://testwith.co.kr/${l}testWith_QR_v/id=${a}${userId}${b}`);
    }

    // 기능 4. 스트리밍 게시
    // userId : 응시자 고유번호 (필수)
    // videoSource : 비디오 디바이스 아이디
    // audioSource : 마이크 디바이스 아이디
    // type : 디바이스 유형 [stream : 웹카메라 (기본값), screen : 화면]
    // elementId : 스트리밍 화면이 게시되는 Element의 ID (기본값 : body에 추가)
    // parameter = {userId : '', videoSource : '', audioSource : '', type : 'stream'}
    stream_start(parameter) {
        parameter = parameter || {};
        const userId = parameter.userId || '';
        const elementId = parameter.elementId || '';
        const videoSource = parameter.videoSource || null;
        const audioSource = parameter.audioSource || null;
        const target = parameter.type === 'screen' ? 'screen' : 'stream';
        const path = target === 'stream' ? 'p' : 's';

        if (userId === '') return this.handleErrorResponse(1002, 'userId');

        const initializeSession = () => {

            let errorHandle;
            const publish_option = {
                insertMode: 'replace',
                fitMode: 'contain',
                width: '',
                height: '',
                usePreviousDeviceSelection: true,
                videoSource: videoSource,
                audioSource: audioSource,
                frameRate: 7,
                style: {
                    nameDisplayMode: 'off',
                    buttonDisplayMode: 'off',
                    audioLevelDisplayMode: 'off',
                },
            }
    
            if (path === 'p') {
                errorHandle = (error) => {
                    if (error) {
                        console.error(error.message);
                        console.error(error.name);
                        this.publishers.stream = null;
                        this.streamOn = false;
                        this.onFailStream();
                        const btn_box = document.getElementById('testwith_btn-box_stream');
                        const video_box = document.getElementById('testwith_video-box_stream');
                        if (btn_box) btn_box.classList.remove('testwith_d-none');
                        if (video_box) video_box.classList.add('testwith_d-none');
                    }
                }

                publish_option['name'] = `${userId}_p`;
                publish_option['facesMode'] = 'user';
                publish_option['resolution'] ='640x480';
                publish_option['videoContentHint'] = "motion";
        
            } else {
                errorHandle = (error) => {
                    if (error) {
                        console.error(error.message);
                        console.error(error.name);
                        this.publishers.screen = null;
                        this.screenOn = false;
                        this.onFailScreen();
                        const btn_box = document.getElementById('testwith_btn-box_screen');
                        const video_box = document.getElementById('testwith_video-box_screen');
                        if (btn_box) btn_box.classList.remove('testwith_d-none');
                        if (video_box) video_box.classList.add('testwith_d-none');
                    }
                }

                publish_option['name'] = `${userId}_s`;
                publish_option['resolution'] ='640x360';
                publish_option['videoContentHint'] = "text";
                publish_option['publishAudio'] = false;
            }
    
            const fail_publish = (text) => {
                const btnBox = document.getElementById(`testwith_btn-box_${target}`);
                const videoBox = document.getElementById(`testwith_video-box_${target}`);
                if (btnBox) btnBox.classList.remove('testwith_d-none');
                if (videoBox) videoBox.classList.add('testwith_d-none');
                if (path === "s") {
                    this.screenOn = false;
                    this.publishers.screen = null;
                    this.onFailScreen();
                } else if (path === 'p') {
                    this.streamOn = false;
                    this.publishers.stream = null;
                    this.onFailStream();
                }
            }
    
            const streamVideoCheck = () => {
                if (this.publishers.stream) {
                    const screenCheck = this.publishers.stream.stream.hasVideo;
                    if (screenCheck) {
                        setTimeout(streamVideoCheck, 3000);
                    } else {
                        this.publishers.stream.destroy();
                    }
                }
            }
    
            const screenVideoCheck = () => {
                if (this.publishers.screen) {
                    const screenCheck = this.publishers.screen.stream.hasVideo;
                    if (screenCheck) {
                        setTimeout(screenVideoCheck, 3000);
                    } else {
                        this.publishers.screen.destroy();
                    }
                }
            }

            const recordVonage = (stream_id) => {
                const state = 1;
                const uuid = `${userId}_${path}`;
                const session_id = this.stream_info.b;
                fetch(`${this.server}/services/history`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ uuid, session_id, stream_id, state }),
                }).then(() => console.log('Save history'));
            }
    
            if (this.streamSession) {
                let targetElement = document.getElementById(elementId);
                if (!targetElement) {
                    targetElement = document.createElement('div');
                    targetElement.id = elementId;

                    if (elementId == `tw_${target}_publisher`) {
                        targetElement.classList.add('testwith_innerdiv');
                        document.getElementById(`testwith_video-box_${target}`).appendChild(targetElement);
                    } else {
                        document.body.appendChild(targetElement);
                    }
                }
    
                const publisher = OT.initPublisher(elementId, publish_option, errorHandle);
                publisher.on({
                    disconnected: () => fail_publish('disconnected'),
                    // connected: () => console.log(`${target} connected`),
                    streamCreated: event => {
                        console.log(`${target} streamCreated`);
                        recordVonage(event.stream.id);
        
                        if (path === 'p') {
                            this.streamOn = true;
                            const stream_video = document.getElementById(elementId).querySelector('video');
                            this.recordStreams.p = stream_video.captureStream();
                            this.publishers.stream = publisher;
                            const source = publisher.getVideoSource();
                            this.connectAI({deviceId : source.deviceId}); // AI 연결
                            this.onSuccessStream();
                            setTimeout(streamVideoCheck, 3000);
        
                        } else {
                            this.screenOn = true;
                            const screen_video = document.getElementById(elementId).querySelector('video');
                            this.recordStreams.s = screen_video.captureStream();
                            this.publishers.screen = publisher;
                            this.onSuccessScreen();
                            setTimeout(screenVideoCheck, 3000);
                        }
                    },
                    destroyed: () => fail_publish('destroyed'),
                    videoDisabled: () => fail_publish('videoDisabled')
                });
                this.streamSession.publish(publisher, errorHandle);
    
            } else {
                this.streamSession = OT.initSession(this.stream_info.a, this.stream_info.b);
                this.streamSession.on('sessionDisconnected', (event) => console.log('Disconnected from the session.', event.reason));
                this.streamSession.connect(this.stream_info.c, error => {
                    if (error) {
                        console.error(error);
                    } else {
                        let targetElement = document.getElementById(elementId);
                        if (!targetElement) {
                            targetElement = document.createElement('div');
                            targetElement.id = elementId;
        
                            if (elementId == `tw_${target}_publisher`) {
                                targetElement.classList.add('testwith_innerdiv');
                                document.getElementById(`testwith_video-box_${target}`).appendChild(targetElement);
                            } else {
                                document.body.appendChild(targetElement);
                            }
                        }

                        const publisher = OT.initPublisher(elementId, publish_option, errorHandle);
                        publisher.on({
                            disconnected: () => fail_publish('disconnected'),
                            // connected: () => console.log(`${target} connected`),
                            streamCreated: event => {
                                console.log(`${target} streamCreated`);
                                recordVonage(event.stream.id);
        
                                if (path === 'p') {
                                    this.streamOn = true;
                                    const stream_video = document.getElementById(elementId).querySelector('video');
                                    this.recordStreams.p = stream_video.captureStream();
                                    this.publishers.stream = publisher;
                                    const source = publisher.getVideoSource();
                                    this.connectAI({ deviceId : source.deviceId }); // AI 연결
                                    this.onSuccessStream();
                                    setTimeout(streamVideoCheck, 3000);
                                } else {
                                    this.screenOn = true;
                                    const screen_video = document.getElementById(elementId).querySelector('video');
                                    this.recordStreams.s = screen_video.captureStream();
                                    this.publishers.screen = publisher;
                                    this.onSuccessScreen();
                                    setTimeout(screenVideoCheck, 3000);
                                }
                            },
                            destroyed: () => fail_publish('destroyed'),
                            videoDisabled: () => fail_publish('videoDisabled'),
                        });
                        this.streamSession.publish(publisher, errorHandle);
                    }
                });
            }
        }

        if (this.stream_info.a) {
            initializeSession();
        } else {
            fetch(`${this.server}/services/publish`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    path: 'p',
                    uuid: userId,
                    type: 'normal',
                }),
            }).then(res => res.json()).then(data => {
                this.stream_info.a = data['a'];
                this.stream_info.b = data['b'];
                this.stream_info.c = data['c'];
                initializeSession();
            });
        }
    }

    // 기능 5. AI 연결
    // deviceId : AI 기능에 연결할 카메라 디바이스 아이디
    // parameter = {deviceId : ''}
    connectAI = async (parameter) => {
        if (!this.scriptLoaded) return this.handleErrorResponse(1003);

        parameter = parameter || {};
        const deviceId = parameter.deviceId || '';

        if (!this.AI_videoElement) {
            this.AI_videoElement = document.createElement('video');
            this.AI_videoElement.classList.add('testwith_d-none');
            document.body.appendChild(this.AI_videoElement);
        }

        if (this.AIcamera) return;
        this.AIcamera = new Camera(this.AI_videoElement, {
            onFrame: async () => {
                try {
                    await this.faceAI.send({ image: this.AI_videoElement });
                } catch (error) {
                    return error;
                }
            },
            width: this.v_size,
            height: this.v_size,
            frameRate: 10,
            deviceId: deviceId,
        });
    }

    // 기능 6. 얼굴 등록 UI 생성
    // langKey : 언어 선택 [kr : 한국어(기본값), en : 영어, jp : 일본어]
    // elementId : 얼굴등록을 위한 카메라 UI Element ID (기본값 : body에 자동 요소 추가)
    // parameter = {langKey : 'kr', elementId : ''}
    async createRegister(parameter) {
        try {
            if (!this.scriptLoaded) return this.handleErrorResponse(1003);

            parameter = parameter || {};
            const langKey = parameter.langKey || 'kr';
            const elementId = parameter.elementId || '';

            if (this.registElement) this.registElement.parentNode.removeChild(this.registElement);
            const registElement = document.createElement('div');
            registElement.innerHTML = `
                <div class="testwith_video-box testwith_innerdiv testwith_d-none" id="testwith_video-box_regist">
                    <div id="testwith_selectDiv_regist" class="testwith_innerdiv testwith_d-none">
                        <p id="tw_selTxt_regist">${this.lang_dict[langKey]['카메라선택']}</p>
                        <select id="tw_selVal_regist" name="camList_regist"></select>
                        <button id="tw_selCam_regist" class="testwith_d-none">${this.lang_dict[langKey]['확인']}</button>
                    </div>

                    <canvas id="testwith_registCanvas" width="480px" height="480px"></canvas>
                    <video id="testwith_registVideo" class="testwith_d-none" width="480px" height="480px"></video>
                </div>

                <div class="testwith_modal" id="testwith_modal">
                    <div class="testwith_modal_body">
                        <i class="fas fa-spinner fa-10x fa-spin" style="color: #0078ff"></i>
                        <p class="testwith_loading_txt">Loading...</p>
                    </div>
                </div>
            `;
            this.registElement = registElement;

            const modalElement = document.getElementById(elementId);
            if (!modalElement) {
                document.body.appendChild(registElement);
            } else {
                modalElement.appendChild(registElement);
            }
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
                stream.getVideoTracks()[0].applyConstraints({
                    width: { ideal: 480 },
                    height: { ideal: 480 },
                    frameRate: { ideal: 20 },
                });
    
                const testwith_modal = document.getElementById('testwith_modal');
                const registBox = document.getElementById('testwith_video-box_regist');
                const registVideo = document.getElementById('testwith_registVideo');
                const registBtn = document.getElementById('tw_selCam_regist');
                const selectDiv = document.getElementById('testwith_selectDiv_regist');
                const selVal = document.getElementById('tw_selVal_regist');
    
                const deviceLabel = stream.getVideoTracks()[0].label;
                try {
                    const devices = await navigator.mediaDevices.enumerateDevices();
                    for (const deviceInfo of devices) {
                        const option = document.createElement('option');
                        option.value = deviceInfo.deviceId;
                        if (deviceInfo.kind === 'videoinput') {
                            option.text = deviceInfo.label;
                            if (deviceLabel === deviceInfo.label) option.selected = true;
                            selVal.appendChild(option);
                        }
                    }
                    registBtn.classList.remove('testwith_d-none');
        
                } catch (error) {
                    return error;
                }
               
                let selFlag = 0;
                const select_regist = async () => {
                    testwith_modal.classList.remove('testwith_d-none');
                    registVideo.srcObject.getTracks().forEach(track => {
                        track.stop();
                    });
    
                    const constraints = { video: { deviceId: { exact: selVal.value } } }
                    try {
                        const stream = await navigator.mediaDevices.getUserMedia(constraints);
                        stream.getVideoTracks()[0].applyConstraints({
                            width: { ideal: 480 },
                            height: { ideal: 480 },
                            frameRate: { ideal: 20 },
                        });
        
                        registVideo.srcObject = stream;
                        registVideo.volume = 0;
                        registVideo.muted = true;
                        registVideo.play();
        
                        testwith_modal.classList.remove('testwith_d-none');
                        selectDiv.classList.add('testwith_d-none');
                        selFlag = 0;
                    } catch (err) {
                        console.error(err);
                        testwith_modal.classList.add('testwith_d-none');
                        selectDiv.classList.remove('testwith_d-none');
                        return err;
                    }
                }
                registBtn.removeEventListener('click', select_regist);
                registBtn.addEventListener('click', select_regist);
    
                const toggle_select = () => {
                    if (selFlag) return;
                    selFlag = 1;
                    selectDiv.classList.remove('testwith_d-none');
                }
                registBox.removeEventListener('click', toggle_select);
                registBox.addEventListener('click', toggle_select);
    
                const registVideoOnplay = () => {
                    registBox.classList.remove('testwith_d-none');
                    testwith_modal.classList.add('testwith_d-none');
                }
                registVideo.removeEventListener('play', registVideoOnplay);
                registVideo.addEventListener('play', registVideoOnplay);
    
                registVideo.srcObject = stream;
                registVideo.volume = 0;
                registVideo.muted = true;
                registVideo.play();
    
                const registCanvas = document.getElementById('testwith_registCanvas');
                const registCtx = registCanvas.getContext("2d");
                setInterval(() => {
                    registCtx.clearRect(0, 0, 480, 480);
                    registCtx.drawImage(registVideo, 0, 0, 480, 480);
                    registCtx.beginPath();
                    registCtx.setLineDash([0]);
                    registCtx.arc(240, 230, 180, 0, Math.PI * 2);
                    registCtx.strokeStyle = "#4287f5";
                    registCtx.lineWidth = 5;
                    registCtx.stroke();
                }, 50);
    
                return {message : 'success', result : '얼굴 등록 UI 생성 완료'};
    
            } catch (error) {
                console.error(error);
                return error;
            }
        } catch (error) {
            console.error(error);
            return error;
        }
        
    }

    // 기능 7. 얼굴 등록
    // testId : 시험장 고유번호 (필수)
    // userId : 응시자 고유번호 (필수)
    // videoId : 얼굴 등록에 이용할 비디오 태그의 Element Id (기본값 : '')
    // valid : true 시 얼굴등록 기능에서 얼굴 검증 기능으로 전환 (기본값 : false)
    // parameter = {testId : '', userId : '', videoId : '', valid : ''}
    // => {message, result}
    async registFace(parameter) {
        parameter = parameter || {};

        const testId = parameter.testId || '';
        const userId = parameter.userId || '';
        const videoId = parameter.videoId || '';

        const boolCheck = (value) => (value !== true && value !== false) ? false : value;
        const valid = boolCheck(parameter.valid);

        if (testId === '') return this.handleErrorResponse(1002, 'testId');
        if (userId === '') return this.handleErrorResponse(1002, 'userId');

        const testwith_modal = document.getElementById('testwith_modal');
        if (testwith_modal) testwith_modal.classList.remove('testwith_d-none');

        let registVideo = document.getElementById('testwith_registVideo');
        if (videoId !== '') {
            registVideo = document.getElementById(videoId);
            if (!registVideo) return this.handleErrorResponse(3016);
            if (registVideo.tagName.toLowerCase() !== 'video') return this.handleErrorResponse(3014);
            if (registVideo.width !== registVideo.height) return this.handleErrorResponse(3015);
        } else {
            if (!registVideo) return this.handleErrorResponse(3016);
        }

        const regist_canvas = document.createElement("canvas");
        regist_canvas.width = 480;
        regist_canvas.height = 480;
        regist_canvas.getContext("2d").drawImage(registVideo, 0, 0, 480, 480);
        const base64 = regist_canvas.toDataURL("image/jpeg", 1);
        const decoding = atob(base64.split(",")[1]);
    
        let array = [];
        for (let i = 0; i < decoding.length; i++) array.push(decoding.charCodeAt(i)); 
    
        const data = new FormData();
        const file = new Blob([new Uint8Array(array)], { type: "image/jpeg" });
        const imageType = valid ? 'cmp.jpeg' : 'ref.jpeg';
        data.append("file", file, imageType);
        data.append('test_id', testId);
        data.append('user_id', userId);
    
        const link = `${this.server}/services/${this.service_id}/registface`;
        try {
            const res = await fetch(link, { method: "POST", body: data });
            const result = await res.json();
            if (testwith_modal) testwith_modal.classList.add('testwith_d-none');
            // return this.handleErrorResponse(result['resultCode']);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // 기능 8. 화면 AI감독 설정
    // testId : 시험장 고유번호 (필수)
    // userId : 응시자 고유번호 (필수)
    // detectOption = {
    //   screenLeave : 화면 이탈 설정 (기본값 false)
    //   rightClick : 우클릭 설정 (기본값 false)
    //   specialKey : 특수키 설정 (기본값 false)
    // }
    // recordOption : 녹화 활성/비활성 설정 (기본값 false)
    // parameter = {testId : '', userId : '', detectOption : {...}, recordOption : false}
    // => {message, result}
    setScreenAI(parameter) {
        if (!this.scriptLoaded) return this.handleErrorResponse(1003);

        parameter = parameter || {};
        const testId = parameter.testId || '';
        const userId = parameter.userId || '';
        const detectOption = parameter.detectOption || {};

        const boolCheck = (value) => (value !== true && value !== false) ? false : value;
        this.screenDetectOption.screenLeave = boolCheck(detectOption.screenLeave);
        this.screenDetectOption.rightClick = boolCheck(detectOption.rightClick);
        this.screenDetectOption.specialKey = boolCheck(detectOption.specialKey);
        this.screenRecordOption = boolCheck(parameter.recordOption);

        if (testId === '') return this.handleErrorResponse(1002, 'testId');
        if (userId === '') return this.handleErrorResponse(1002, 'userId');

        if (this.recordOption && !this.screenOn) return this.handleErrorResponse(1006);

        let sChunks = [];
        let screenRecordTimer = null; // 화면 녹화 타이머
        let screenRec = {state: 'inactive', stop: () => console.log('녹화 기록 없음')};
        let s_videoNo = 1;

        // 화면 녹화
        const screenRecording = (result, nowRec) => {
            const recOption = { mimeType: "video/webm; codecs=opus, vp9" };
            if (!MediaRecorder.isTypeSupported("video/webm")) {
                recOption.mimeType = 'video/mp4; codecs="avc1.424028, mp4a.40.2"';
            }

            if (screenRec.state !== 'inactive' || sChunks.length || !this.publishers.screen || !this.screenOn) return;

            screenRec = new MediaRecorder(this.recordStreams.s, recOption);
            screenRec.ondataavailable = (e) => sChunks.push(e.data);
            screenRec.start(1000);
            console.log('start Rec', result);

            // 녹화 시간 설정
            screenRecordTimer = setTimeout(() => {
                if (screenRec.state !== 'inactive') {
                    screenRec.stop();
                }
                this.screenRecordOption = true;
            }, 10000);

            // 녹화 종료 시 결과 전송
            screenRec.onstop = () => {
                if (sChunks.length > 1) {
                    const recordedBlob = new Blob(sChunks, { type: 'video/webm; codecs=opus, vp9' });

                    sChunks = [];
                    const videoPath = `AI/screen/${userId}/${result}_`;
            
                    const data = new FormData();
                    data.append("dir", videoPath);
                    data.append("record", recordedBlob, `${nowRec}_${s_videoNo}.webm`);

                    const xhr = new XMLHttpRequest();

                    this.upload_state.uploading++;
                    this.upload_state[this.upload_state.uploading] = 0;
                    xhr.upload.onprogress = (event) => {
                        this.upload_state[this.upload_state.uploading] = (event.loaded / event.total) * 100;
                        const values = Object.keys(this.upload_state)
                        .filter(key => !['uploading', 'uploaded', 'average'].includes(key))
                        .map(key => this.upload_state[key]);
                        this.upload_state.average = values.reduce((total, value) => total + value, 0) / values.length;
                    };

                    xhr.onload = () => {
                        if (xhr.status === 200) {
                            s_videoNo++;
                            console.log('upload complete', result);
                        } else {
                            console.error(`Error: ${xhr.statusText}`);
                        }
                        this.upload_state.uploaded++;
                    };
                    xhr.open('POST', `${this.server}/vonage/video_upload`);
                    xhr.send(data);
                    
                } else {
                    sChunks = [];
                }
            }
            return;
        }

        // 부정행위 녹화 관리 및 기록
        const manageRecording = (result) => {
            const now = Date.now();
            if (this.screenRecordOption) {
                this.screenRecordOption = false;
                screenRecording(result, now);
            } else {
                this.cheatAction[result] = 0;
                setTimeout(() => (this.cheatAction[result] = 1), 3000);
            }

            fetch(`${this.server}/services/cheat`, {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify({ result, now, testId, userId }),
            }).then(res => res.json()).then(data => {
                if (data["result"] === "success") {
                    console.log(`${result} cheatRec success`);
                }
            }).catch(err => {
                console.log("cheatRec error");
            });
        };

        // 화면이탈
        const detectScreen = (() => {

            // 화면 최소화
            const handleVisibilityChange = () => {
                if (this.screenDetectOption.screenLeave && document.hidden) {
                    manageRecording("화면이탈");
                }
            }

            // 마우스 이탈
            let mouseTimeout;
            const handleMouseLeaveEvent = () => {
                if (this.screenDetectOption.screenLeave) {
                    mouseTimeout = setTimeout(() => {
                        if (this.cheatAction["화면이탈"]) manageRecording("화면이탈");
                    }, 3000)
                }
            }
            const handleMouseEnterEvent = () => {
                if (this.screenDetectOption.screenLeave) clearTimeout(mouseTimeout);
            }

            // 전체화면
            const isFullScreen = () => {
                return (
                    document.fullscreenElement ||
                    document.webkitFullscreenElement ||
                    document.mozFullScreenElement ||
                    document.msFullscreenElement ||
                    (window.innerWidth == screen.width && window.innerHeight == screen.height)
                );
            }

            const handleFullScreenChange = () => {
                if (!isFullScreen() && this.screenDetectOption.screenLeave) manageRecording("화면이탈");
            }

            // 이벤트등록
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.addEventListener('visibilitychange', handleVisibilityChange);

            const mouseLeave = document.documentElement;
            mouseLeave.removeEventListener("mouseleave", handleMouseLeaveEvent);
            mouseLeave.addEventListener("mouseleave", handleMouseLeaveEvent);
            mouseLeave.removeEventListener("mouseenter", handleMouseEnterEvent);
            mouseLeave.addEventListener("mouseenter", handleMouseEnterEvent);

            const fullscreenElement = document.documentElement;
            fullscreenElement.removeEventListener('fullscreenchange', handleFullScreenChange);
            fullscreenElement.addEventListener('fullscreenchange', handleFullScreenChange);
        })();

        // 우클릭
        const detectRightclick = (() => {
            const handleRightClick = (e) => {
                if (this.screenDetectOption.rightClick && e.button === 2 && this.cheatAction["우클릭"]) {
                    manageRecording("우클릭");
                    e.preventDefault();
                }
            }
            document.removeEventListener('contextmenu', handleRightClick);
            document.addEventListener('contextmenu', handleRightClick);
        })();

        // 특수키
        const detectSpecialkey = (() => {
            let keyDown = 1;

            const handleSpecialKeyDown = (e) => {
                const specialKeys = ["Tab", "Control", "F12", "Escape"];
                e = e || window.event;
                if (this.screenDetectOption.specialKey && specialKeys.includes(e.key) && keyDown === 1 && this.cheatAction["특수키"]) {
                    manageRecording("특수키");
                    e.preventDefault();
                    keyDown = 0;
                }
            }

            const handleSpecialKeyUp = (e) => {
                const specialKeys = ["Tab", "Control", "F12", "Escape"];
                e = e || window.event;
                if (specialKeys.includes(e.key)) {
                    e.preventDefault();
                    keyDown = 1;
                }
            }

            document.removeEventListener("keydown", handleSpecialKeyDown);
            document.addEventListener("keydown", handleSpecialKeyDown);
            document.removeEventListener("keyup", handleSpecialKeyUp);
            document.addEventListener("keyup", handleSpecialKeyUp);
        })();
    }

    // 기능 9. 얼굴 AI감독 설정
    // testId : 시험장 고유번호 (필수)
    // userId : 응시자 고유번호 (필수)
    // detectOption = {
    //   existFace : 얼굴 미검출 (기본값 false),
    //   multiFace : 얼굴 다중검출 (기본값 false),
    //   validFace : 얼굴 불일치 (기본값 false),
    //   gaze : 시선 (기본값 false),
    // }
    // recordOption : 녹화 활성/비활성 설정 (기본값 false)
    // parameter = {testId : '', userId : '', detectOption : {...}, recordOption : false}
    // => {message, result}
    setFaceAI(parameter) {
        if (!this.scriptLoaded) return this.handleErrorResponse(1003);

        parameter = parameter || {};
        const testId = parameter.testId || '';
        const userId = parameter.userId || '';
        const detectOption = parameter.detectOption || {};

        const boolCheck = (value) => (value !== true && value !== false) ? false : value;
        this.faceDetectOption.existFace = boolCheck(detectOption.existFace);
        this.faceDetectOption.multiFace = boolCheck(detectOption.multiFace);
        this.faceDetectOption.validFace = boolCheck(detectOption.validFace);
        this.faceDetectOption.gaze = boolCheck(detectOption.gaze);
        this.faceRecordOption = boolCheck(parameter.recordOption);

        if (testId === '') return this.handleErrorResponse(1002, 'testId');
        if (userId === '') return this.handleErrorResponse(1002, 'userId');
        if (!this.AIcamera) return 'connect AI first';
        if (!this.streamOn) return 'stream start first'

        const user_state = {caution: 0, cheat: "일치", recBuf: ''};
        let webcamRec = {state: 'inactive', stop: () => console.log('녹화 기록 없음')};
        let delayRec = 0; // 녹화 지연시간
        let pChunks = []; // 음성 녹음 청크
        let webcamRecordTimer = null; // 웹캠 녹화 타이머
        let w_videoNo = 1; // 웹캠 녹화 순서

        let valid_try = 1; // 검증 여부
        let detect_faceAuth = 50; // 부정행위 감지 임계값
        const facemark = [
            0, 1, 2, 10, 151, 199, 33, 133, 159, 145, 362, 263, 386, 374,
            471, 469, 470, 472, 468, 476, 474, 475, 477, 473,
        ];

        let focus_start = 0;
        let gaze_interval = null; // 시선 측정 주기
        let beforeGaze = 10; // 시선 레퍼런스

        // 코드표 업데이트 시 변경
        const resultCode_dict = {
            400 : '파일 형식 오류',
            401 : '파일명 오류',
            402 : '미검출',
            403 : '다중검출',
            404 : '재등록 요청',
            405 : '미등록',
            406 : '불일치',
            201 : '일치',
        };

        const regist_parameter = {
            testId : testId,
            userId : userId,
            videoId : this.AI_videoElement.Id,
            valid : true,
        }

        // 웹캠 녹화
        const webcamRecording = (result) => {
            if (webcamRec.state !== 'inactive' || pChunks.length || delayRec | !this.streamOn) return;

            // delayRecording
            if (user_state["recBuf"] === result) {
                delayRec = 1;
                user_state["recBuf"] = '';
                console.log("유예 시작(5s)");
    
                setTimeout(() => {
                    console.log("유예 종료");
                    delayRec = 0;
                }, 5000);
    
                return;
            }
            user_state["recBuf"] = result;
        
            // 녹화 시작
            if (!this.publishers.stream) return;

            const recOption = { mimeType: "video/webm; codecs=opus, vp9" };
            if (!MediaRecorder.isTypeSupported("video/webm")) {
                recOption.mimeType = 'video/mp4; codecs="avc1.424028, mp4a.40.2"';
            }
            webcamRec = new MediaRecorder(this.recordStreams.p, recOption);
            webcamRec.ondataavailable = (e) => pChunks.push(e.data);
            webcamRec.start(1000);
            console.log('녹화시작', result);
    
            // 녹화 시간 설정
            webcamRecordTimer = setTimeout(() => {
                if (webcamRec.state !== 'inactive') {
                    webcamRec.stop();
                }
                this.faceRecordOption = true;
            }, 10000);
    
            // 녹화 종료 시 결과 전송
            const nowRec = Date.now();
            webcamRec.onstop = () => {
                if (pChunks.length > 1) {
                    const recordedBlob = new Blob(pChunks, {
                        type: 'video/webm; codecs=opus, vp9',
                    });
    
                    pChunks = [];
                    const videoPath = `AI/pc/${userId}/${result}_`;
                    const data = new FormData();
                    data.append("dir", videoPath);
                    data.append("record", recordedBlob, `${nowRec}_${w_videoNo}.webm`);
    
                    const xhr = new XMLHttpRequest();

                    this.upload_state.uploading++;
                    this.upload_state[this.upload_state.uploading] = 0;
                    xhr.upload.onprogress = (event) => {
                        this.upload_state[this.upload_state.uploading] = (event.loaded / event.total) * 100;
                        const values = Object.keys(this.upload_state)
                        .filter(key => !['uploading', 'uploaded', 'average'].includes(key))
                        .map(key => this.upload_state[key]);
                        this.upload_state.average = values.reduce((total, value) => total + value, 0) / values.length;
                    };

                    xhr.onload = () => {
                        if (xhr.status === 200) {
                            w_videoNo++;
                            user_state["cheat"] = '일치';
                            console.log('upload complete', result);
                        } else {
                            console.error(`Error: ${xhr.statusText}`);
                        }
                        this.upload_state.uploaded++;
                    };
                    xhr.open('POST', `${this.server}/vonage/video_upload`);
                    xhr.send(data);
                } else {
                    pChunks = [];
                }
            }
        }

        // 부정행위 녹화 관리 및 기록
        const manageRecording = (result) => {
            const now = Date.now();
            if (this.faceRecordOption) {
                this.faceRecordOption = false;
                webcamRecording(result, now);
            } else {

            }

            fetch(`${this.server}/services/cheat`, {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify({ result, now, testId, userId }),
            }).then(res => res.json()).then(data => {
                if (data["result"] === "success") {
                    console.log(`${result} cheatRec success`);
                }
            }).catch(err => {
                console.log("cheatRec error");
            });
        };

        const turnValid = () => { valid_try = 1 };

        const onResults = (results) => {
            this.AIcamera_start = true;
            const faceLength = results.multiFaceLandmarks.length;

            if (faceLength === 1) {
                if (valid_try && this.faceDetectOption.validFace) {
                    valid_try = 0;
                    this.registFace(regist_parameter).then(data => {

                        if (data.result === 406) {
                            beforeGaze = 0;
                            manageRecording(resultCode_dict[data.result]);
                            setTimeout(turnValid, 5000);

                        } else if ([400, 401, 404, 405, 500].includes(data.result)) {
                            manageRecording(resultCode_dict[data.result]);
            
                        } else if (data.result !== 201) {
                            setTimeout(turnValid, 5000);
                        }

                        user_state["cheat"] = resultCode_dict[data.result];
                    });
                } else {
                    user_state["cheat"] = '일치';
                }
                detect_faceAuth = 0;

                for (const landmarks of results.multiFaceLandmarks) {
                    const f_marks = facemark.reduce((p, c) => {
                        p.push(landmarks[c]);
                        return p;
                    }, []);
                    this.info_container["FL"].push(f_marks); 
                    if (this.info_container["FL"].length > 10) this.info_container["FL"].shift();
                }

            } else {
                const cheatType = faceLength === 0 ? '미검출' : '다중검출';
                const authThreshold = faceLength === 0 ? 70 : 40;

                if ((faceLength === 0 && this.faceDetectOption.existFace) || (faceLength !== 0 && this.faceDetectOption.multiFace)) {
                    if (detect_faceAuth >= authThreshold) {
                        if (user_state["cheat"] !== cheatType) manageRecording(cheatType);
                        user_state["cheat"] = cheatType;
                        detect_faceAuth = 0;
                        beforeGaze = 0;
                        valid_try = 1;
    
                    } else {
                        detect_faceAuth++;
                    }
                } else {
                    detect_faceAuth = 50;
                }
            }
        }

        const checkAndSendFocus = () => {
            if (this.AIcamera_start && this.faceDetectOption.gaze) {
                if (["일치", "시선비정상"].includes(user_state["cheat"])) {
                    beforeGaze = T(this.info_container)['score'] === 0 ? 0 : beforeGaze + 1;
                    if (beforeGaze > 8) {
                        beforeGaze = 0;
                        if (user_state["cheat"] !== "시선비정상") manageRecording("시선비정상");
                        user_state["cheat"] = "시선비정상";
                    } else {
                        user_state["cheat"] = "일치";
                    }
                }
            }
            gaze_interval = setTimeout(checkAndSendFocus, 3000);
        }

        this.faceAI.onResults(onResults);
        this.AIcamera.start();
        checkAndSendFocus();
    }

    // 기능 10. 시선 조정 UI 생성
    // testId : 시험장 고유번호 (필수)
    // userId : 응시자 고유번호 (필수)
    // optimizeTime : 시선 조정 대기시간[단위 : 초] (기본값 : 5)
    // langKey : 언어 선택 [kr : 한국어(기본값), en : 영어, jp : 일본어]
    // parameter = {testId : '', userId : '', optimizeTime : 5, langKey : ''}
    // => {message, result}
    createGazeOptimize(parameter) {
        if (!this.scriptLoaded) return this.handleErrorResponse(1003);

        parameter = parameter || {};
        const testId = parameter.testId;
        const userId = parameter.userId;
        const optimizeTime = parameter.optimizeTime || 5;
        const langKey = parameter.langKey || 'kr';
        if (!testId) return this.handleErrorResponse(1002, 'testId');
        if (!userId) return this.handleErrorResponse(1009, 'userId');

        const timeleft = (!Number.isInteger(optimizeTime) || optimizeTime < 1) ? 5 : optimizeTime;
        let modalElement = document.getElementById('testwith_registOptimize');
        if (!modalElement) {
            modalElement = document.createElement('div');
            modalElement.id = 'testwith_registOptimize'
            modalElement.classList.add('testwith_registOptimize_modal');
            modalElement.innerHTML = `
                <h2> [시선 조정] 버튼을 클릭하고 바른 자세로 화면 중앙을 ${timeleft}초간 바라보세요. </h2>
                <br />
                <h2><b>- ${this.lang_dict[langKey]['시선자세']} -</b></h2>
                <div class="testwith_registOptimize_center">
                    <div id="testwith_load_circle"></div>
                    <span class="testwith_d-none" id="testwith_center_text"></span>
                    <span class="testwith_d-none" id="testwith_opt_count">5</span>
                </div>
                <div class="testwith_optimize">
                    <button class="testwith_d-none" id="tw_opt_btn">${this.lang_dict[langKey]['시선조정']}</button>
                    <p class="testwith_d-none" id="tw_opt_loading">${this.lang_dict[langKey]['시선추적안내']}</p>
                </div>
            `;
            document.body.appendChild(modalElement);
        } else {
            modalElement.classList.remove('testwith_d-none');
        }

        const optBtn = document.getElementById("tw_opt_btn");
        const centerText = document.getElementById('testwith_center_text');
        optBtn.classList.add('testwith_d-none');
        centerText.classList.remove('testwith_d-none');
        centerText.innerHTML = this.lang_dict[langKey]['연결중'];

        // 이벤트를 등록하는 부분
        const optimizeStart = () => {
            const opt_parameter = {
                testId : testId,
                userId : userId,
                optimizeTime : timeleft,
                langKey : langKey,
            }
            this.gazeOptimize(opt_parameter);
        }

        if (optBtn) {
            optBtn.removeEventListener("click", optimizeStart);
            optBtn.addEventListener("click", optimizeStart);
        }

        if (!this.AIcamera_start) {
            if (!this.registElement) {
                modalElement.classList.add('testwith_d-none');
                // 카메라 연결 먼저(연결된 카메라가 없음)
                return this.handleErrorResponse(1007);
            }

            const track = this.registElement.querySelector('video').captureStream().getVideoTracks();
            if (track.length > 0) {
                const deviceId = track[0].getSettings().deviceId;
                this.connectAI({deviceId : deviceId}); // AI 연결

            } else {
                modalElement.classList.add('testwith_d-none');
                // 카메라 연결 먼저(연결된 카메라가 없음)
                return this.handleErrorResponse(1007);
            }

            const facemark = [
                0, 1, 2, 10, 151, 199, 33, 133, 159, 145, 362, 263, 386, 374,
                471, 469, 470, 472, 468, 476, 474, 475, 477, 473,
            ];

            const onResults = (results) => {
                this.AIcamera_start = true;
                const faceLength = results.multiFaceLandmarks.length;
                if (faceLength === 1) {
                    for (const landmarks of results.multiFaceLandmarks) {
                        const f_marks = facemark.reduce((p, c) => {
                            p.push(landmarks[c]);
                            return p;
                        }, []);
                        this.info_container["FL"].push(f_marks); 
                        if (this.info_container["FL"].length > 10) this.info_container["FL"].shift();
                    }
    
                }
            }

            const playAI = () => {
                if (this.AIcamera) {
                    this.AIcamera.start();
                    optBtn.classList.remove('testwith_d-none');
                    centerText.classList.add('testwith_d-none');
                    centerText.innerHTML = '';
                } else {
                    setTimeout(playAI, 1000);
                }
            }

            const doc = document.documentElement;
            doc.requestFullscreen() ||
            doc.webkitRequestFullScreen() ||
            doc.mozRequestFullScreen() ||
            doc.msRequestFullscreen();

            this.faceAI.onResults(onResults);
            setTimeout(playAI, 1000);
        } else {
            const doc = document.documentElement;
            doc.requestFullscreen() ||
            doc.webkitRequestFullScreen() ||
            doc.mozRequestFullScreen() ||
            doc.msRequestFullscreen();

            optBtn.classList.remove('testwith_d-none');
            centerText.classList.add('testwith_d-none');
            centerText.innerHTML = '';
        }
    }

    // 기능 11. 시선 조정 (선택)
    // testId : 시험장 고유번호 (필수)
    // userId : 응시자 고유번호 (필수)
    // optimizeTime : 시선 조정 대기시간[단위 : 초] (기본값 : 5)
    // langKey : 언어 선택 [kr : 한국어(기본값), en : 영어, jp : 일본어]
    // parameter = {testId : '', userId : '', optimizeTime : 5, langKey : ''}
    // => {message, result}
    gazeOptimize(parameter) {
        if (!this.scriptLoaded) return this.handleErrorResponse(1003);
        if (!this.AIcamera_start) return 'connect AI first';

        parameter = parameter || {};
        const testId = parameter.testId;
        const userId = parameter.userId;
        const optimizeTime = parameter.optimizeTime || 5;
        const langKey = parameter.langKey || 'kr';
        if (!testId) return this.handleErrorResponse(1002, 'testId');
        if (!userId) return this.handleErrorResponse(1002, 'userId');

        const modalElement = document.getElementById('testwith_registOptimize');
        const loadCircle = document.getElementById("testwith_load_circle");
        const centerText = document.getElementById("testwith_center_text");
        const optBtn = document.getElementById("tw_opt_btn");
        const optLoading = document.getElementById("tw_opt_loading");
        const optCount = document.getElementById("testwith_opt_count");

        let timeleft = (!Number.isInteger(optimizeTime) || optimizeTime < 1) ? 5 : optimizeTime;
        this.info_container["FL"] = [];

        const isFullScreen = () => {
            return (
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement ||
                (window.innerWidth == screen.width && window.innerHeight == screen.height)
            );
        }

        const exitFullscreen = () => {
            document.exitFullscreen() ||
            document.webkitExitFullScreen() ||
            document.mozExitFullScreen() ||
            document.msExitFullscreen();
        }

        const optCounter = () => {
            timeleft--;

            if (timeleft < 1) {
                optCount.classList.add("testwith_d-none");
                centerText.classList.remove("testwith_d-none");
                centerText.innerHTML = this.lang_dict[langKey]['저장중'];

                if (this.info_container["FL"].length === 0) {
                    if (modalElement) {
                        loadCircle.classList.remove("testwith_load_circle");
                        modalElement.classList.add("testwith_d-none");
                        if (isFullScreen()) exitFullscreen();
                    }

                    console.log(this.lang_dict[langKey]['미검출알림']);
                }
            
                this.info_container['uuid'] = userId;
                this.info_container['test_id'] = testId;
                fetch(`${this.server}/api/gazeOpt`, {
                    method: "POST",
                    body: JSON.stringify(this.info_container),
                }).then(res => res.json()).then(data => {
                    if (data["res"]) {
                        if (modalElement) {
                            loadCircle.classList.remove("testwith_load_circle");
                            modalElement.classList.add("testwith_d-none");
                            if (isFullScreen()) exitFullscreen();
                        }
                        console.log('시선조정완료');
                    }
                });

            } else {
                if (modalElement) {
                    centerText.classList.remove("testwith_d-none");
                    optCount.classList.remove("testwith_d-none");
                    optCount.innerHTML = timeleft;
                }
                setTimeout(optCounter, 1000);
            }
        }

        if (modalElement) {
            loadCircle.classList.add("testwith_load_circle");
            optBtn.classList.add("testwith_d-none");
            optLoading.classList.remove("testwith_d-none");
            centerText.classList.remove("testwith_d-none");
        }
        setTimeout(optCounter, 1000);
    }

    // 기능12. 신호채널연결
    // testId : 시험장 고유번호 (필수)
    // userId : 응시자 고유번호 (필수)
    // langKey : 언어 선택 [kr : 한국어(기본값), en : 영어, jp : 일본어]
    // chatOpen : 채팅 UI 사용 여부 [true : 사용(기본값), false : 미사용]
    // parameter = {testId : '', userId : '', langKey : '', chatOpen : true}
    // => {message, result}
    connectSignal(parameter) {
        if (!this.scriptLoaded) return this.handleErrorResponse(1003);
        parameter = parameter || {};
        const testId = parameter.testId;
        const userId = parameter.userId;
        const langKey = parameter.langKey || 'kr';

        const boolCheck = (value) => (value !== true && value !== false) ? true : value;
        const chatOpen = boolCheck(parameter.chatOpen);
        if (!testId) return this.handleErrorResponse(1002, 'testId');
        if (!userId) return this.handleErrorResponse(1002, 'userId');

        if (this.chatElement) this.chatElement.parentNode.removeChild(this.chatElement);
        const chatElement = document.createElement('div');
        chatElement.classList.add('testwith_chatBody');
        chatElement.innerHTML = `
            <div id="testwith_chat">
                <span id="testwith_chat_alarm" class="testwith_d-none"></span>
                <i class="fa-solid fa-comment"></i>
            </div>

            <div id="testwith_modalChat" class="testwith_d-none">
                <div class="testwith_chat_container">
                    <div class="testwith_chat_head" id="testwith_chat_head">
                        <div class="testwith_chat_home" id="testwith_chat_home">
                            <i class="fa-solid fa-chevron-left"></i>
                        </div>
                        <b>${this.lang_dict[langKey]['응시자문의']}</b>
                        <div id="testwith_chat_close" class="testwith_chat_close">
                            <i class="fa-regular fa-x"></i>
                        </div>
                    </div>
                    <div class="testwith_chat_main" id="testwith_chatDataList">
                        ${this.lang_dict[langKey]['내용로드']}
                    </div>
                    <div class="testwith_chat_foot">
                        <div class="testwith_message" id="testwith_messageDiv">
                            <input
                                type="text"
                                id="testwith_messageText"
                                placeholder='${this.lang_dict[langKey]['내용입력']}'
                                maxlength="200"
                                autocomplete="off"
                            />
                            <button type="button" id="testwith_messageBtn" class="testwith_balloon testwith_message">
                                <i class="fa-regular fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="testwith_toast"></div>
        `;
        this.chatElement = chatElement;
        if (chatOpen) document.body.appendChild(chatElement);

        const tw_chat = document.getElementById("testwith_chat");
        const modal_body = document.getElementById("testwith_modalChat");
        const chat_close = document.getElementById("testwith_chat_close");
        const chat_container = document.querySelector(".testwith_chat_container");
        const chatDataList = document.getElementById("testwith_chatDataList");
        const chat_alarm = document.getElementById('testwith_chat_alarm');
        const messageText = document.getElementById("testwith_messageText");
        const messageBtn = document.getElementById("testwith_messageBtn");
        const toast = document.getElementById("testwith_toast");
        messageBtn.disabled = false;

        // 사이즈 조절
        const resizeApply = () => {
            const winH = window.innerHeight;
            const winW = window.innerWidth;

            if (winW > 425 ) {
                chat_container.style.gridTemplateRows = "8% 80% 9%";
                chatDataList.style.height = '520px';
            } else {
                chat_container.style.gridTemplateRows = "";
                chatDataList.style.height = '';
            }

            if (winH < 835 && winW > 425) modal_body.style.zoom = (winH / 835);
            else modal_body.style.zoom = 1;

            if (winH >= 710) modal_body.style.bottom = "100px";
            if (winH >= 626 && winH < 710) {modal_body.style.bottom = "115px";}
            else if (winH >= 561 && winH < 626) {modal_body.style.bottom = "130px";}
            else if (winH < 561) {modal_body.style.bottom = "145px";}
        }

        resizeApply();
        window.removeEventListener("resize", resizeApply);
        window.addEventListener('resize', resizeApply);

        // 채팅창 열기 지연
        let openDelayState = 0;
        const openDelay = () => {
            openDelayState = 1;
            setTimeout(() => {
                openDelayState = 0;
            }, 1000);
        }

        // 채팅창 열고 닫기
        let isOpenChat = 0;
        const openChat = () => {
            if (isOpenChat) {   
                modal_body.classList.add('testwith_d-none');
                isOpenChat = 0;
                openDelay();

            } else {
                if(openDelayState) return;
                isOpenChat = 1;
                chat_alarm.innerHTML = 0
                modal_body.classList.remove('testwith_d-none');
                chat_alarm.classList.add('testwith_d-none');
                chatDataList.scrollTop = chatDataList.scrollHeight;
                messageText.focus();
                client.markAsReadAllChannel();
            }
        }

        // 채팅창 닫기
        const modalChat_close = () => {
            modal_body.classList.add('testwith_d-none');
            isOpenChat = 0;
            openDelay();
        }

        const convertTime = (inputDate) => {
            const nowDate = new Date(inputDate);
            const month = String(nowDate.getMonth() + 1).padStart(2, '0');
            const date = String(nowDate.getDate()).padStart(2, '0');
            const hour = String(nowDate.getHours()).padStart(2, '0');
            const minute = String(nowDate.getMinutes()).padStart(2, '0');

            const chat_date_detail = this.lang_dict[langKey]['시간출력'](month, date);
            const chat_time = `${hour}:${minute}`;
            return [chat_date_detail, chat_time];
        }

        // 송신 출력
        let last_chat_date = '';
        const write_UserChat = (user_id, idx, chat_date, chat_time, message, read_message_num) => {
            const templateBox_user = document.createElement('templete');
            const hrSectHTML = (last_chat_date === chat_date) ? `` : `<div class="testwith_hr-sect">${chat_date}</div>`;
            templateBox_user.innerHTML = `
                <div class="testwith_chat_box">
                    ${hrSectHTML}
                    <ul class="testwith_chat_box_right">
                        <div class="testwith_chat_read">
                            <span class="testwith_chat_read_num" id="testwith_chat_read_num_${idx}">${read_message_num}</span>
                            <span class="testwith_chat_time_i">${chat_time}</span>
                        </div>
                        <li class="testwith_balloon testwith_send">
                            <div class="testwith_sendtext">${message}</div>
                        </li>
                    </ul>
                </div>
            `;
            last_chat_date = chat_date;
            chatDataList.appendChild(templateBox_user.children[0]);
        }

        // 수신 출력
        const write_listenChat = (chat_date, chat_time, message, name) => {
            const templateBox_user = document.createElement('templete');
            const hrSectHTML = (last_chat_date === chat_date) ? `` : `<div class="testwith_hr-sect">${chat_date}</div>`;
            templateBox_user.innerHTML = `
                <div class="testwith_chat_box">
                    ${hrSectHTML}
                    <p class="testwith_chat_name">${name}</p>
                    <ul class="testwith_chat_box_left">
                        <li class="testwith_balloon testwith_recv">
                            <div class="testwith_recvtext">${message}</div>
                        </li>
                        <span class="testwith_chat_time_y">${chat_time}</span>
                    </ul>
                </div>
            `;
            last_chat_date = chat_date;
            chatDataList.appendChild(templateBox_user.children[0]);
        }

        // 공지 출력
        const write_noticeChat = (chat_date, message, idx) => {
            const templateBox_notice = document.createElement('templete');
            const hrSectHTML = (last_chat_date === chat_date) ? `` : `<div class="testwith_hr-sect">${chat_date}</div>`;
            templateBox_notice.innerHTML = `
                <div class="testwith_chat_notice_box">
                    ${hrSectHTML}
                    <div class="testwith_notice_balloon testwith_noticeList" id='${idx}'>
                        <div class="testwith_noticetext" >${message}</div>
                    </div>
                </div>
            `;
            last_chat_date = chat_date;
            chatDataList.appendChild(templateBox_notice.children[0]);
        }

        // 메세지 수신 토스트
        let removeToast;
        function toast_msg() {

            if (isOpenChat === 0) {
                toast.style.display = 'block';
                toast.style.fontSize = '14px';
                toast.style.right = '0px';
            } else if (isOpenChat === 1) {
                toast.style.display = 'none';
            }

            clearTimeout(removeToast);
            removeToast = setTimeout( () => {
                if (toast.classList.contains("testwith_reveal")) {
                    toast.classList.remove("testwith_reveal");
                }
            }, 4500);
            
            toast.classList.add("testwith_reveal"),
            toast.innerText = this.lang_dict[langKey]['새메세지'];
            if (langKey === 'en') toast.style.right = '-10px';
        }

        // 문자열 전처리
        const escapeHTML = (str) => {
            return str.replace(/[&<>"']/g, match => {
                switch(match) {
                    case '&': return '&amp;';
                    case '<': return '&lt;';
                    case '>': return '&gt;';
                    case '"': return '&quot;';
                    case "'": return '&#39;';
                }
            });
        }

        // 채팅 주기 제어 (1s)
        let chatDelay = 0;
        const emit_delay = () => {
            chatDelay = 1;
            setTimeout(() => chatDelay = 0, 1000);
        }

        // 감독관 신호
        const signal_process = (data) => {
            const split_data = data.split('_');
            if (split_data[0] === 'getout') {
                this.callbackSignal_getout();
            } else if (split_data[0] === 'cheat') {
                this.callbackSignal_cheater();
            } else if (split_data[0] === 'caution') {
                this.callbackSignal_caution(split_data[1]);
            } else if (split_data[0] === 'w') {
                this.callbackSignal_webcam();
            } else if (split_data[0] === 'm') {
                this.callbackSignal_mobile();
            } else if (split_data[0] === 's') {
                this.callbackSignal_screen();
            } else if (split_data[0] === 'addtime') {
                console.log('signal addtime', split_data[1]);
            }
        }

        const channelId = `${testId}_${userId}`;
        let user_name = this.lang_dict[langKey]['익명'];
        let user_number = '';

        return new Promise((resolve, reject) => {

            fetch(`${this.server}/services/student_chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            }).then(res => res.json()).then((data) => {
                if (data.name) user_name = data.name;
                if (data.user_num) user_number = data.user_num;
                window.client = new TalkPlus.Client({appId: data.talk});

                const sendMessage = async() => {

                    if (chatDelay) return;
                    emit_delay();

                    const message = escapeHTML(messageText.value);
                    if (message) {
                        const writer = '0';
                        const notice = '0';
                        const user = `${userId}_${user_name}_${user_number}`;

                        client.sendMessage({
                            channelId: channelId,
                            type: 'text',
                            text: message,
                            data : { user, testId, writer, notice }
                        }).then(res => {
                            const messageInfo = res.message;
                            const idx = messageInfo.id;
                            const nowDate = new Date(messageInfo.createdAt);
                            const [chat_date_detail, chat_time] = convertTime(nowDate);
                            const message = messageInfo.text;

                            client.getChannel({ channelId }).then(info => {
                                const memberCnt = info.channel.memberCount;
                                const readInfo = client.getMessageUnreadCount({channel: info.channel, message: messageInfo});

                                let read_message_num = '1';
                                if (memberCnt === 2) {
                                    read_message_num = readInfo == 0 ? '' : '1';
                                } else if (memberCnt > 2) {
                                    read_message_num = readInfo < (memberCnt - 1) ? '' : '1';
                                }

                                write_UserChat(userId, idx, chat_date_detail, chat_time, message, read_message_num);
                                chatDataList.scrollTop = chatDataList.scrollHeight;

                                if (read_message_num === '') {
                                    document.querySelectorAll('.testwith_chat_read_num').forEach(item => item.innerHTML = '');
                                }
                            });

                        }).catch(err => {
                            console.error(err);
                        });

                        messageText.value = '';

                        // 응시자 채팅 저장
                        fetch(`${this.server}/chat/insert_chat`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ user_id : userId, test_id : testId, writer, message, notice, user_name, user_number }),
                        });
                    }
                }

                const keyupMessage = (event) => {
                    if (event.keyCode === 13) sendMessage();
                }

                // login talkPlus
                client.loginAnonymous({
                    userId: userId,
                    username: user_name,
                    profileImageUrl: '',
                }).then(res => {
                    console.log('Tok login', user_name);

                    // 채널 조회, 가입 및 불러오기
                    client.getChannels({}).then(info => {
                        const channels = info.channels;
                        const chatRooms = channels.map(ch => ch.id);
                        const promises = [];
                        if (!chatRooms.includes(testId)) {
                            console.log(`공지 채널 Join`);
                            promises.push(client.joinChannel({ channelId: testId }));
                        }

                        if (!chatRooms.includes(`s${testId}`)) {
                            console.log(`신호 채널 Join`);
                            promises.push(client.joinChannel({ channelId: `s${testId}` }));
                        }

                        if ((!chatRooms.includes(`${testId}_${userId}`))) {
                            console.log(`사용자 채널 Join`);
                            promises.push(client.joinChannel({ channelId }));
                        }

                        Promise.allSettled(promises).then(chResults => {
                            console.log(`채널 Join 완료`, chResults);
                            const channelCheck = chResults.filter(data => {
                                return data.status === 'rejected';
                            });

                            if (channelCheck.length) {
                                console.log('시험장 개설과 응시자 초대를 먼저 진행해주세요');
                                reject({
                                    message: '시험장 개설과 응시자 초대를 먼저 진행해주세요',
                                    result: 400,
                                });
                            }

                            // 메세지 수신
                            client.on('event', payload => {
                                if (payload.type === 'message') {

                                    const info = payload.message;

                                    const chat_idx = info.id;
                                    const writer = info.data.writer;
                                    const notice = info.data.notice;

                                    if (writer === '0') return;
                                    if (info.data.user_id !== 'notice' && userId != info.data.user_id) return;

                                    const message = info.text;
                                    const nowDate = new Date(info.createdAt);
                                    const [chat_date, chat_time] = convertTime(nowDate);

                                    if (notice === '0') {
                                        if (chatOpen) {
                                            const name = writer === '1' ? this.lang_dict[langKey]['출제자'] : this.lang_dict[langKey]['감독관'];
                                            write_listenChat(chat_date, chat_time, message, name);
                                            document.querySelectorAll('.testwith_chat_read_num').forEach(item => item.innerHTML = '');
                                        }

                                    } else if (notice === '1') {
                                        if (chatOpen) write_noticeChat(chat_date, message, chat_idx);

                                    } else if (notice === 's') {
                                        signal_process(info.text);
                                        return;
                                    }

                                    if (chatOpen) {
                                        if (isOpenChat !== 1) {
                                            chat_alarm.innerText = Number(chat_alarm.innerText) + 1;
                                            chat_alarm.classList.remove('testwith_d-none');
                                            toast_msg();
                                        } else {
                                            chat_alarm.innerText = 0;
                                            chatDataList.scrollTop = chatDataList.scrollHeight;
                                            client.markAsReadAllChannel();
                                        }
                                    }
                                }
                            });

                            const messagePromices = [
                                client.getMessages({
                                    channelId: `${testId}`,
                                    order: 'latest',
                                    limit: 25, // how many messages, max: 50
                                }),
                                client.getMessages({
                                    channelId: channelId,
                                    order: 'latest',
                                    limit: 25, // how many messages, max: 50
                                }),
                            ];

                            if (chatOpen) {
                                Promise.allSettled(messagePromices).then(msgResults => {
                                    console.log('메세지 로딩 완료', msgResults);
                                    chatDataList.style.alignItems = 'normal';
                                    chatDataList.style.justifyContent = 'normal';
                                    chatDataList.innerHTML = '';

                                    const notice_data = msgResults[0].status === 'fulfilled' ? msgResults[0].value.messages : [];
                                    const user_data = msgResults[1].status === 'fulfilled' ? msgResults[1].value.messages : [];
                                    const messages = notice_data.concat(user_data);
                                    messages.sort((a, b) => a.createdAt - b.createdAt);
                                    messages.forEach(info => {
                                        const chat_idx = info.id;
                                        const writer = info.data.writer;
                                        const notice = info.data.notice;
                                        const message = info.text;
                                        const nowDate = new Date(info.createdAt);
                                        const [chat_date, chat_time] = convertTime(nowDate);
                                        const read_num = '';
            
                                        if(writer === '0') {  
                                            write_UserChat(userId, chat_idx, chat_date, chat_time, message, read_num);  // 송신
            
                                        } else if (notice === '0') {  
                                            const name = writer === '1' ?  this.lang_dict[langKey]['출제자'] : this.lang_dict[langKey]['감독관'];
                                            write_listenChat(chat_date, chat_time, message, name);  //수신
            
                                        } else if (notice === '1') {
                                            write_noticeChat(chat_date, message, chat_idx);  // 공지
                                        }
                                    });
            
                                    if (isOpenChat !== 1) {
                                        client.getUnreadCount().then(resp => {
                                            if (resp.count) {
                                                chat_alarm.innerText = resp.count;
                                                chat_alarm.classList.remove('d-none');
                                            }
                                        });
                                    }
        
                                    tw_chat.removeEventListener("click", openChat);
                                    tw_chat.addEventListener('click', openChat);
                                    chat_close.removeEventListener("click", modalChat_close);
                                    chat_close.addEventListener('click', modalChat_close);
                                    messageBtn.removeEventListener("click", sendMessage);
                                    messageBtn.addEventListener('click', sendMessage);
                                    messageText.removeEventListener("keyup", keyupMessage);
                                    messageText.addEventListener('keyup', keyupMessage);
                                    resolve({
                                        message: '연결완료',
                                        result: 200,
                                    });
                                });
                            } else {
                                resolve({
                                    message: '연결완료',
                                    result: 200,
                                });
                            }
                        });
                    });
                });
            });
        });
    }
    
    // 신호 callback
    callbackSignal_getout() {
        console.log('signal getout');
    }

    callbackSignal_cheater() {
        console.log('signal cheater');
    }

    callbackSignal_caution(count) {
        console.log('signal caution', count);
    }

    callbackSignal_webcam() {
        console.log('signal webcam reconnect');
    }

    callbackSignal_mobile() {
        console.log('signal mobile reconnect');
    }

    callbackSignal_screen() {
        console.log('signal screen reconnect');
    }

    // 채팅 로그인
    _loginTalkPlus(test_id) {
        return new Promise((resolve, reject) => {
            client.loginAnonymous({
                userId: test_id,
                username: '출제자',
            }).then(res => {
                console.log('Tok login', '출제자');
                this._get_channels(null, test_id);
                resolve();
            }).catch(err => {
                console.error(err);
                reject(err);
            });
        });
    }

    // 채널 전체 조회
    _get_channels(lastChannelId, test_id) {
        client.getChannels({lastChannelId, limit:50}).then(info => {
            console.log(info,": info")
            
            for (let channel of info.channels) {
                const channel_id = channel['id'].split('_');
                if (channel_id[1] && channel_id[1] !== 'assist') {
                    this._created_studentId.push(channel_id[1]);
                } else if (channel_id[2]){
                    this._created_assistId.push(channel_id[2]);
                } else if (!channel_id[2] && !channel_id[1] && channel_id[0]) {
                    if (channel_id[0][0] === 's') {
                        this._created_noticeId.push(channel_id[0]);
                    } else {
                        this._created_signalId.push(channel_id[0]);
                    }
                }
            }
            if (info.hasNext) {
                const lastChannelId = info.channels[info.channels.length - 1].id;
                this._get_channels(lastChannelId, test_id);
            } else {
                if (this._created_noticeId.length > 0) {
                    this._update_notice_channel(test_id);
                }
                if (this._created_signalId.length > 0) {
                    this._update_signal_channel(test_id);
                }
            }
        });
    }

    // 공지사항 채널 생성
    _create_notice_channel(test_id) {
        return new Promise((resolve, reject) => {
            if (!this._created_noticeId.includes(test_id)) {
                const channelId = `${test_id}`;
                client.createChannel({
                    channelId: channelId,
                    name: channelId,
                    type: 'super_public',
                    members: [],
                    maxMemberCount:100,
                }).then(res => {
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            } else {
                resolve();
            }
        });
    }

    // 신호 채널 생성
    _create_signal_channel(test_id) {
        return new Promise((resolve, reject) => {
            if (!this._created_signalId.includes(`s${test_id}`)) {
                const channelId = `s${test_id}`;
                client.createChannel({
                    channelId: channelId,
                    name: channelId,
                    type: 'super_public',
                    members: [],
                    maxMemberCount:100,
                }).then(res => {
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            } else {
                resolve();
            }
        });
    }

    // 감독관 채널 생성
    _create_assist_channel(user_id, test_id) {
        console.log(user_id,"assist_user_id")

        return new Promise((resolve, reject) => {
            if (!this._created_assistId.includes(user_id)) {
                const channelId = `${test_id}_assist_${user_id}`;
                client.createChannel({
                    channelId: channelId,
                    name: channelId,
                    type: 'public',
                    members: [],
                }).then(res => {
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            } else {
                resolve();
            }
        });
    }

    // 응시자 채널 생성
    _create_student_channel(user_id, test_id) {
        return new Promise((resolve, reject) => {
            if (!this._created_studentId.includes(user_id)) {
                const channelId = `${test_id}_${user_id}`;
                client.createChannel({
                    channelId: channelId,
                    name: channelId,
                    type: 'public',
                    members: [],
                }).then(res => {
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            } else {
                resolve();
            }
        });
        
    }

    // 공지사항 채널 멤버 업데이트
    _update_notice_channel(test_id) {
        const invite_member = this._created_studentId.length + this._created_assistId.length + 20;
        console.log("invite_member(+20):", invite_member);

        client.getChannel({ channelId: `${test_id}` }).then(res => {
            if (res.channel.maxMemberCount < invite_member) {
                return client.updateChannel({
                    channelId: test_id,
                    maxMemberCount: invite_member, // default 100
                });
            } else {
                return Promise.resolve();
            }
        }).then(res => {
            console.log("update complete");
        }).catch(err => {
            console.error("Error:", err);
        });
    }

    // 신호 채널 멤버 업데이트
    _update_signal_channel(test_id) {
        const invite_member = this._created_studentId.length + this._created_assistId.length + 20;
        console.log("invite_member(+20) s:", invite_member);

        client.getChannel({ channelId: `s${test_id}` }).then(res => {
            if (res.channel.maxMemberCount < invite_member) {
                return client.updateChannel({
                    channelId: `s${test_id}`,
                    maxMemberCount: invite_member, // default 100
                });
            } else {
                return Promise.resolve();
            }
        }).then(res => {
            console.log("update complete s");
        }).catch(err => {
            console.error("Error s:", err);
        });
    }
}