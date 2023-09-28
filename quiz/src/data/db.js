const subjects = [
    {
        id: 1,
        name: "Math",
        thumb: "https://i0.wp.com/calmatters.org/wp-content/uploads/2021/08/math-curriculum.jpg?fit=2000%2C1500&ssl=1",
        "time": 3660000,
        "questions": [
            {
                id: 1,
                question: "8 : 2(2+2)",
                answers: [
                    16,
                    1,
                    8,
                    24
                ],
                correct_answer: 16
            },
            {
                id: 2,
                question: "5 + 3 * 2",
                answers: [
                    11,
                    16,
                    13,
                    9
                ],
                correct_answer: 11
            },
            {
                id: 3,
                question: "12 / 3 + 4",
                answers: [
                    8,
                    7,
                    6,
                    5
                ],
                correct_answer: 8
            },
            {
                id: 4,
                question: "7 - 2 * 3",
                answers: [
                    1,
                    11,
                    9,
                    4
                ],
                correct_answer: 1
            },
            {
                id: 5,
                question: "2^3",
                answers: [
                    8,
                    4,
                    6,
                    16
                ],
                correct_answer: 8
            },
            {
                id: 6,
                question: "15 / 5 + 2 * 4",
                answers: [
                    8,
                    10,
                    7,
                    9
                ],
                correct_answer: 10
            },
            {
                id: 7,
                question: "9 - 2 + 5 * 3",
                answers: [
                    24,
                    16,
                    30,
                    18
                ],
                correct_answer: 16
            },
            {
                id: 8,
                question: "4 * (2 + 3)",
                answers: [
                    10,
                    14,
                    20,
                    12
                ],
                correct_answer: 20
            },
            {
                id: 9,
                question: "10 / (2 * 5)",
                answers: [
                    1,
                    2,
                    0.5,
                    5
                ],
                correct_answer: 1
            },
            {
                id: 10,
                question: "3 + 4 * 2 - 5",
                answers: [
                    10,
                    11,
                    8,
                    12
                ],
                correct_answer: 11
            },
            {
                id: 11,
                question: "6 * 2 - 4 / 2",
                answers: [
                    11,
                    7,
                    8,
                    6
                ],
                correct_answer: 7
            }
        ]
    },
    {
        id: 2,
        name: "Physics",
        thumb: "https://img.freepik.com/premium-vector/physical-formulas-phenomenon_40453-51.jpg?w=2000",
        "time": 600000,
        "questions": [
            {
                id: 1,
                question: "Làm thế nào để tính tốc độ của một vật di chuyển khi biết quãng đường và thời gian?",
                answers: [
                    "Vận tốc = Quãng đường / Thời gian",
                    "Vận tốc = Thời gian / Quãng đường",
                    "Vận tốc = Khối lượng / Cường độ",
                    "Vận tốc = Áp suất / Mức độ"
                ],
                correct_answer: "Vận tốc = Quãng đường / Thời gian"
            },
            {
                id: 2,
                question: "Định luật nào của Newton nói về việc một vật cứ tiếp tục di chuyển hoặc nằm yên nếu không có lực nào tác động lên nó?",
                answers: [
                    "Định luật thứ nhất",
                    "Định luật thứ hai",
                    "Định luật thứ ba",
                    "Định luật vận tốc"
                ],
                correct_answer: "Định luật thứ nhất"
            },
            {
                id: 3,
                question: "Làm thế nào để tính áp suất của một hệ thống?",
                answers: [
                    "Áp suất = Lực / Diện tích",
                    "Áp suất = Khối lượng / Thể tích",
                    "Áp suất = Tốc độ / Quãng đường",
                    "Áp suất = Nhiệt độ / Khối lượng"
                ],
                correct_answer: "Áp suất = Lực / Diện tích"
            },
            {
                id: 4,
                question: "Đơn vị nào được sử dụng để đo khả năng dẫn điện của một vật liệu?",
                answers: [
                    "Ohm",
                    "Watt",
                    "Ampere",
                    "Volt"
                ],
                correct_answer: "Ohm"
            },
            {
                id: 5,
                question: "Làm thế nào để tính công (work) được thực hiện trên một vật?",
                answers: [
                    "Công = Lực x Quãng đường x cos(θ)",
                    "Công = Momen động x Thời gian",
                    "Công = Năng lượng x Thời gian",
                    "Công = Tốc độ x Thời gian"
                ],
                correct_answer: "Công = Lực x Quãng đường x cos(θ)"
            },
            {
                id: 6,
                question: "Làm thế nào để tính trọng lực trên một vật?",
                answers: [
                    "Trọng lực = Khối lượng x Gia tốc trọng trường",
                    "Trọng lực = Vận tốc x Khối lượng",
                    "Trọng lực = Cường độ x Diện tích",
                    "Trọng lực = Áp suất x Thể tích"
                ],
                correct_answer: "Trọng lực = Khối lượng x Gia tốc trọng trường"
            },
            {
                id: 7,
                question: "Làm thế nào để tính năng lượng tiềm năng (potential energy) của một vật trong trường trọng lực?",
                answers: [
                    "Năng lượng tiềm năng = Khối lượng x Chiều cao x Gia tốc trọng trường",
                    "Năng lượng tiềm năng = Điện tích x Điện trường",
                    "Năng lượng tiềm năng = Điện áp x Dòng điện",
                    "Năng lượng tiềm năng = Áp suất x Thể tích"
                ],
                correct_answer: "Năng lượng tiềm năng = Khối lượng x Chiều cao x Gia tốc trọng trường"
            },
            {
                id: 8,
                question: "Làm thế nào để tính tốc độ của âm thanh trong không khí?",
                answers: [
                    "Vận tốc âm thanh = 343 m/s",
                    "Vận tốc âm thanh = 760 km/h",
                    "Vận tốc âm thanh = 300,000,000 m/s",
                    "Vận tốc âm thanh = 1,000 km/s"
                ],
                correct_answer: "Vận tốc âm thanh = 343 m/s"
            },
            {
                id: 9,
                question: "Định luật nào của Newton nói về mối quan hệ giữa lực, khối lượng và gia tốc?",
                answers: [
                    "Định luật thứ nhất",
                    "Định luật thứ hai",
                    "Định luật thứ ba",
                    "Định luật vận tốc"
                ],
                correct_answer: "Định luật thứ hai"
            },
            {
                id: 10,
                question: "Làm thế nào để tính tỷ lệ giữa điện áp, dòng điện và trở kháng trong mạch điện?",
                answers: [
                    "Điện áp = Dòng điện x Trở kháng",
                    "Dòng điện = Điện áp / Trở kháng",
                    "Trở kháng = Điện áp / Dòng điện",
                    "Điện áp = Dòng điện + Trở kháng"
                ],
                correct_answer: "Điện áp = Dòng điện x Trở kháng"
            }
        ]
    },
    {
        id: 3,
        name: "History",
        thumb: "data:image/jpeg;base64,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",
        "time": 60000,
        "questions": [
            {
                id: 1,
                question: "Năm nào Đại dịch Đen bùng phát tại châu Âu?",
                answers: [
                    "1347, 1348",
                    "1492, 1493",
                    "1776, 1777",
                    "1914, 1915"
                ],
                correct_answer: "1347, 1348"
            },
            {
                id: 2,
                question: "Ai là người sáng lập Cộng hòa La Mã và được coi là Vị Thánh Bổn Mạng của thành phố La Mã?",
                answers: [
                    "Romulus, Remus",
                    "Julius Caesar, Augustus",
                    "Napoleon Bonaparte, Louis XIV",
                    "Aeneas, Dido"
                ],
                correct_answer: "Romulus, Remus"
            },
            {
                id: 3,
                question: "Cuộc Cách mạng Công nghiệp bắt đầu ở nước nào vào thế kỷ 18?",
                answers: [
                    "Anh, Vương quốc Liên hiệp Hà Lan-Bỉ",
                    "Pháp, Đế quốc Đức",
                    "Nga, Thụy Điển",
                    "Mỹ, Tây Ban Nha"
                ],
                correct_answer: "Anh, Vương quốc Liên hiệp Hà Lan-Bỉ"
            },
            {
                id: 4,
                question: "Ai là vị lãnh tụ của cuộc cách mạng Mỹ vào thế kỷ 18?",
                answers: [
                    "George Washington",
                    "Napoleon Bonaparte",
                    "Mao Zedong",
                    "Catherine the Great"
                ],
                correct_answer: "George Washington"
            },
            {
                id: 5,
                question: "Sự kiện nào được gọi là 'Ngày Độc lập' của Hoa Kỳ?",
                answers: [
                    "4 tháng 7, 1776",
                    "14 tháng 7, 1789",
                    "5 tháng 5, 1789",
                    "2 tháng 9, 1945"
                ],
                correct_answer: "4 tháng 7, 1776"
            },
            {
                id: 6,
                question: "Ai là người đứng đầu nước Đức trong thời kỳ chiến tranh thế giới thứ hai?",
                answers: [
                    "Adolf Hitler",
                    "Winston Churchill",
                    "Joseph Stalin",
                    "Franklin D. Roosevelt"
                ],
                correct_answer: "Adolf Hitler"
            },
            {
                id: 7,
                question: "Sự kiện nào được gọi là 'Cuộc Cách mạng Tư sản' tại Nga?",
                answers: [
                    "1917",
                    "1789",
                    "1945",
                    "1861"
                ],
                correct_answer: "1917"
            },
            {
                id: 8,
                question: "Ai là vị vua của nước Pháp trong thời kỳ Cách mạng Pháp?",
                answers: [
                    "Louis XVI",
                    "Napoleon Bonaparte",
                    "Marie Antoinette",
                    "Robespierre"
                ],
                correct_answer: "Louis XVI"
            },
            {
                id: 9,
                question: "Thế chiến I diễn ra trong khoảng thời gian nào?",
                answers: [
                    "1914-1918",
                    "1939-1945",
                    "1870-1871",
                    "1917-1923"
                ],
                correct_answer: "1914-1918"
            },
            {
                id: 10,
                question: "Ai là người sáng lập Đế chế Maurya tại Ấn Độ cổ đại?",
                answers: [
                    "Chandragupta Maurya",
                    "Ashoka the Great",
                    "Akbar the Great",
                    "Babur"
                ],
                correct_answer: "Chandragupta Maurya"
            }
        ]
    }
]

export const getSubjects = () => {
    return subjects
}

export const getSubject = (id) => {
    return subjects.find((subject) => subject.id === id)
}
