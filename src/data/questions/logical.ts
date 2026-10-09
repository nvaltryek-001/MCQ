import { build, type Raw } from "./build";
import type { Question } from "@/lib/types";

const S = "logical" as const;
const m = (module: string, raws: Raw[]) => build(S, module, raws);
const SYL = ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"];
const DS = ["Statement I alone is sufficient", "Statement II alone is sufficient", "Either statement alone is sufficient", "Both statements together are needed"];

export const logical: Question[] = [
...m("Blood Relations", [
  ["e","Basic relations","A is B's sister and B is C's father. How is A related to C?",["Mother","Grandmother","Aunt","Cousin"],2,"A is the sister of C's father, so A is C's paternal aunt."],
  ["e","Photograph puzzle","Pointing to a photograph, Ravi says, “She is the daughter of my father's only son.” How is the girl related to Ravi?",["Sister","Daughter","Niece","Cousin"],1,"Ravi's father's only son is Ravi himself, so she is Ravi's daughter."],
  ["m","Introductions","Introducing a man, a woman says, “His mother is the only daughter of my father.” How is the man related to the woman?",["Brother","Son","Nephew","Husband"],1,"The only daughter of the woman's father is the woman herself, so the man's mother is the woman. He is her son."],
  ["m","Family chain","P is Q's brother. R is Q's mother. S is R's father. T is S's mother. How is P related to T?",["Grandson","Son","Great-grandson","Nephew"],2,"R is P's mother, S is R's father, and T is S's mother. So T is P's great-grandmother and P is T's great-grandson."],
  ["h","Coded relations","In a code: A + B means A is the mother of B; A − B means A is the brother of B; A × B means A is the father of B. In ‘P × Q − R + S’, how is P related to S?",["Paternal grandfather","Father","Maternal uncle","Maternal grandfather"],3,"P is the father of Q; Q is the brother of R, so P is also R's father; R is the mother of S. Hence P is S's maternal grandfather."],
]),
...m("Direction Sense Test", [
  ["e","Turning","A man is facing south. He turns left and walks 3 km. In which direction is he now walking?",["West","North","East","South"],2,"Facing south, a left turn points east."],
  ["m","Displacement","Rohan walks 10 m north, turns right and walks 15 m, then turns right again and walks 10 m. How far is he from his starting point?",["10 m","15 m","25 m","35 m"],1,"North 10 m, east 15 m, then south 10 m brings him level with the start, 15 m to the east."],
  ["m","Distance from start","A man walks 6 km west, turns right and walks 8 km. How far is he from the starting point?",["14 km","12 km","10 km","2 km"],2,"He ends 6 km west and 8 km north: √(6² + 8²) = 10 km."],
  ["m","Rotation","A person facing north-east turns 90° clockwise and then 135° anticlockwise. Which direction does he face now?",["East","North","South-west","North-west"],1,"North-east turned 90° clockwise faces south-east (135° from north). Turning 135° anticlockwise gives 0°, which is north."],
  ["h","Multi-leg path","Starting from P, a man walks 4 km east, 3 km north, 4 km west, 6 km south and finally 4 km east. What is his straight-line distance from P?",["3 km","4 km","7 km","5 km"],3,"Net displacement: east 4 − 4 + 4 = 4 km; north 3 − 6 = 3 km south. Distance = √(4² + 3²) = 5 km."],
]),
...m("Series", [
  ["e","Difference pattern","Find the next term: 2, 6, 12, 20, 30, ?",["40","42","44","36"],1,"Differences are 4, 6, 8, 10, so the next difference is 12 and the term is 42."],
  ["e","Multiplication pattern","Find the next term: 3, 6, 12, 24, ?",["36","42","30","48"],3,"Each term is doubled: 24 × 2 = 48."],
  ["m","Prime series","Find the next term: 2, 3, 5, 7, 11, 13, ?",["15","19","17","21"],2,"These are consecutive primes; the prime after 13 is 17."],
  ["m","Alternating operations","Find the next term: 5, 10, 8, 16, 14, 28, ?",["26","56","30","24"],0,"The pattern alternates ×2 and −2: 28 − 2 = 26."],
  ["h","Compound pattern","Find the next term: 7, 8, 18, 57, 232, ?",["1160","1185","1165","1170"],2,"Pattern: ×1+1, ×2+2, ×3+3, ×4+4, ×5+5. So 232 × 5 + 5 = 1165."],
]),
...m("Coding and Decoding", [
  ["e","Letter shift","If CAT is coded as DBU, how is DOG coded?",["EPH","EOH","DPH","FQJ"],0,"Each letter moves one place forward: D→E, O→P, G→H."],
  ["m","Constant shift","If APPLE is coded as CRRNG, how is MANGO coded?",["OCPIQ","OCNIQ","NBOHP","OCPHQ"],0,"Each letter is shifted +2: M→O, A→C, N→P, G→I, O→Q."],
  ["m","Digit codes","If DELHI is coded as 73541 and CALCUTTA as 82589662, how is CALICUT coded?",["5279378","8251896","8543691","8251869"],1,"From the codes: C=8, A=2, L=5, I=1, U=9, T=6. CALICUT = 8 2 5 1 8 9 6."],
  ["m","Sentence codes","In a code, ‘ink pen’ is ‘ko ma’, ‘pen red’ is ‘ma ti’ and ‘red book’ is ‘ti su’. What is the code for ‘ink’?",["ma","ti","su","ko"],3,"‘Pen’ is common to the first two sentences, so ‘ma’ = pen and ‘ko’ = ink."],
  ["h","Progressive shift","In a code, MOBILE is written as NQEMQK (shifts of +1, +2, +3, +4, +5, +6). How is SCREEN written?",["TEVIJT","SDUIJT","TEUIJT","TDUIJS"],2,"S+1=T, C+2=E, R+3=U, E+4=I, E+5=J, N+6=T, giving TEUIJT."],
]),
...m("Analogy", [
  ["e","Tool and action","Book : Reading :: Fork : ?",["Eating","Cooking","Cutting","Plate"],0,"A book is used for reading; a fork is used for eating."],
  ["e","Person and place","Doctor : Hospital :: Teacher : ?",["Student","Book","School","Class"],2,"A doctor works in a hospital; a teacher works in a school."],
  ["m","Number analogy","8 : 64 :: 11 : ?",["121","111","99","132"],0,"8² = 64, so 11² = 121."],
  ["m","Worker and tool","Pen : Writer :: Brush : ?",["Canvas","Painter","Colour","Studio"],1,"A writer uses a pen; a painter uses a brush."],
  ["h","Letter pattern","ACE : FHJ :: BDF : ?",["GJL","FHJ","HJL","GIK"],3,"Each letter shifts +5: B→G, D→I, F→K."],
]),
...m("Seating Arrangement", [
  ["e","Row count","Ravi is 7th from the left end and 12th from the right end of a row. How many people are in the row?",["19","17","18","20"],2,"7 + 12 − 1 = 18."],
  ["m","Row order","A, B, C, D and E sit in a row. A is to the left of B but to the right of C. D is to the right of E but to the left of C. Who is at the extreme left?",["D","C","B","E"],3,"C…A…B and E…D…C combine to E, D, C, A, B. E is at the left end."],
  ["m","Circular table","Eight people sit around a circular table facing the centre. If P is 3rd to the left of Q, then Q is which position to the left of P?",["3rd","4th","5th","6th"],2,"In a circle of 8, the positions from the two directions add up to 8: 8 − 3 = 5th."],
  ["m","Position from the other end","In a row of 25 students, Meena is 9th from the left. What is her position from the right?",["15th","16th","17th","18th"],2,"25 − 9 + 1 = 17th."],
  ["h","Linear puzzle","Seven friends A–G sit in a row facing north. G is at the left end. F is third to the right of G. A is at the right end. E sits immediately right of F. B sits to the left of F but not next to G. C sits immediately left of A. Who sits between G and B?",["C","D","E","F"],1,"Positions: G(1), F(4), A(7), E(5). B is left of F and not next to G, so B(3). C sits immediately left of A at 6, leaving D at 2. D sits between G and B."],
]),
...m("Data Arrangement", [
  ["e","Rank counting","Ria ranks 12th from the top and 28th from the bottom in a class. How many students are in the class?",["38","40","39","41"],2,"12 + 28 − 1 = 39."],
  ["e","Height ordering","A is taller than B, B is taller than C, and D is shorter than C. Who is the tallest?",["B","A","C","D"],1,"A > B > C > D, so A is the tallest."],
  ["m","Weight ordering","Five boxes: P is heavier than Q but lighter than R; S is heavier than R; T is lighter than Q. Which box is the second heaviest?",["P","S","Q","R"],3,"S > R > P > Q > T, so the second heaviest is R."],
  ["m","Assignment","Amit, Bina and Chirag like different colours among red, blue and green. Amit does not like red. Bina likes neither red nor blue. Who likes red?",["Amit","Bina","Chirag","Cannot be determined"],2,"Bina likes green. Amit does not like red, so Amit likes blue. Chirag likes red."],
  ["h","Floor puzzle","Five people P, Q, R, S and T live on different floors of a five-storey building (1 is the lowest). P lives on the lowest floor. Q lives above P but not immediately above. T lives on the top floor. R lives immediately below T. Who lives on the second floor?",["Q","R","S","T"],2,"P = 1, T = 5 and R = 4. Q is above P but not on floor 2, so Q = 3. That leaves S on floor 2."],
]),
...m("Clocks", [
  ["e","Right angle","What is the angle between the hands of a clock at 3:00?",["60°","90°","120°","180°"],1,"At 3:00 the minute hand points to 12 and the hour hand to 3: 3 × 30° = 90°."],
  ["m","Angle at 4:30","What is the angle between the hands of a clock at 4:30?",["30°","60°","45°","75°"],2,"Hour hand: 4 × 30 + 15 = 135°. Minute hand: 180°. Difference = 45°."],
  ["m","Angle at 2:20","What is the angle between the hands of a clock at 2:20?",["40°","60°","50°","70°"],2,"Hour hand: 2 × 30 + 20 × 0.5 = 70°. Minute hand: 20 × 6 = 120°. Difference = 50°."],
  ["m","Coincidences","How many times do the hands of a clock coincide in a day (24 hours)?",["24","44","23","22"],3,"They coincide 11 times in 12 hours, so 22 times in 24 hours."],
  ["h","Hands together","At what time between 4 and 5 o'clock will the hands of a clock coincide?",["21 9/11 min past 4","20 min past 4","22 1/2 min past 4","21 1/2 min past 4"],0,"Hour hand = 120° + 0.5m and minute hand = 6m. They are equal when 5.5m = 120, so m = 21 9/11."],
]),
...m("Calendars", [
  ["e","Odd days","How many odd days are there in a non-leap year?",["0","1","2","7"],1,"365 = 52 weeks + 1 day, so there is 1 odd day."],
  ["e","Counting days","If today is Monday, what day will it be after 10 days?",["Wednesday","Friday","Thursday","Tuesday"],2,"10 mod 7 = 3, so Monday + 3 days = Thursday."],
  ["m","Leap year effect","15 August 1947 was a Friday. What day was 15 August 1948?",["Saturday","Sunday","Monday","Friday"],1,"29 February 1948 falls between the two dates, so 366 days pass: 2 odd days. Friday + 2 = Sunday."],
  ["m","Year end","If 1 January 2024 was a Monday, what day was 31 December 2024?",["Monday","Wednesday","Tuesday","Sunday"],2,"2024 is a leap year; 31 December is 365 days after 1 January, which is 1 odd day. Monday + 1 = Tuesday."],
  ["h","Across a century","1 January 1900 was a Monday. What day was 1 January 2000?",["Friday","Sunday","Monday","Saturday"],3,"From 1900 to 1999 there are 24 leap years (1900 is not a leap year): 36500 + 24 = 36524 days. 36524 mod 7 = 5, so Monday + 5 = Saturday."],
]),
...m("Syllogisms", [
  ["e","All–All chain","Statements: All pens are books. All books are tables.\nConclusions: I. All pens are tables. II. All tables are pens.",SYL,0,"Pens ⊂ books ⊂ tables, so all pens are tables (I). The reverse (II) does not follow."],
  ["m","Some–All chain","Statements: Some doctors are teachers. All teachers are engineers.\nConclusions: I. Some doctors are engineers. II. All engineers are teachers.",["Only II follows","Neither I nor II follows","Only I follows","Both I and II follow"],2,"The doctors who are teachers are also engineers, so I follows. II reverses an ‘All’ statement and does not follow."],
  ["m","All–Some","Statements: All flowers are trees. Some trees are rocks.\nConclusions: I. Some flowers are rocks. II. Some rocks are trees.",SYL,1,"‘Some trees are rocks’ converts to ‘Some rocks are trees’ (II). Nothing links flowers to rocks, so I does not follow."],
  ["m","Complementary pair","Statement: Some books are pens.\nConclusions: I. All books are pens. II. Some books are not pens.",["Only I follows","Only II follows","Either I or II follows","Neither I nor II follows"],2,"Neither is certain alone, but I (all) and II (some not) are contradictory, so exactly one must be true: either I or II."],
  ["h","Three statements","Statements: All A are B. No B is C. Some C are D.\nConclusions: I. No A is C. II. Some D are not B. III. Some D are not A.",["Only I and II follow","Only II and III follow","All I, II and III follow","Only I follows"],2,"A ⊂ B and B ∩ C = ∅ gives I. The D that are C are not B, giving II, and so also not A, giving III."],
]),
...m("Data Sufficiency", [
  ["e","Finding a value","What is the value of x?\nI. 2x = 10.\nII. x is a positive integer.",DS,0,"Statement I gives x = 5. Statement II alone only says x is positive, which is not enough."],
  ["e","Parity","Is the integer n even?\nI. n is divisible by 4.\nII. n is a prime number.",["Statement II alone is sufficient","Statement I alone is sufficient","Both statements together are needed","Neither statement is sufficient"],1,"Any multiple of 4 is even, so I is sufficient. Primes can be even (2) or odd (3), so II is not."],
  ["m","Age problem","What is Ravi's age?\nI. Ravi is 5 years older than Sita.\nII. Sita is 20 years old.",DS,3,"Neither statement alone fixes Ravi's age. Together: 20 + 5 = 25."],
  ["m","Area of a square","What is the area of a square?\nI. Its perimeter is 24 cm.\nII. Its diagonal is 6√2 cm.",DS,2,"Perimeter 24 gives side 6; diagonal 6√2 also gives side 6. Either statement alone gives area 36 cm²."],
  ["h","Sign of a product","Is xy positive?\nI. x > y.\nII. x > 0.",["Statement I alone is sufficient","Statement II alone is sufficient","Both statements together are sufficient","Even both together are not sufficient"],3,"Taking both, x = 2, y = 1 gives xy > 0, while x = 2, y = −1 gives xy < 0. So the data is insufficient."],
]),
...m("Cubes", [
  ["e","Edges of a cube","How many edges does a cube have?",["6","8","10","12"],3,"A cube has 6 faces, 8 vertices and 12 edges."],
  ["m","Two faces painted","A 3×3×3 cube is painted on all faces and cut into 27 small cubes. How many small cubes have exactly two painted faces?",["8","12","6","24"],1,"Edge cubes: 12 edges × (3 − 2) = 12."],
  ["m","No face painted","A 4×4×4 cube painted on all faces is cut into 64 unit cubes. How many have no painted face?",["8","16","4","24"],0,"The inner cube is (4 − 2)³ = 8."],
  ["m","One face painted","A 5×5×5 cube painted on all faces is cut into 125 unit cubes. How many have exactly one painted face?",["27","36","54","64"],2,"6 faces × (5 − 2)² = 6 × 9 = 54."],
  ["h","At most one face","A 6 cm cube is painted on all faces and cut into 1 cm cubes. How many cubes have at most one face painted?",["96","160","64","152"],1,"No paint: 4³ = 64. Exactly one face: 6 × 4² = 96. Total = 160."],
]),
...m("Visual Reasoning", [
  ["e","Counting triangles","A triangle is divided by a line from its apex to the midpoint of the opposite side. How many triangles are in the figure?",["2","3","4","5"],1,"Two small triangles plus the whole triangle make 3."],
  ["e","Counting squares","How many squares of all sizes are in a 2×2 grid of unit squares?",["4","6","5","8"],2,"4 unit squares + 1 large square = 5."],
  ["m","Counting squares","How many squares of all sizes are in a 3×3 grid of unit squares?",["9","14","10","13"],1,"9 (1×1) + 4 (2×2) + 1 (3×3) = 14."],
  ["m","Paper folding","A square sheet is folded in half vertically, then in half horizontally. A hole is punched near the centre of the folded piece, away from the folds. How many holes appear when the sheet is unfolded?",["1","2","4","8"],2,"The folded piece has 4 layers, and each layer receives one hole, so there are 4 holes."],
  ["h","Counting rectangles","How many rectangles (including squares) are there in a 3×3 grid of unit squares?",["27","36","24","9"],1,"Choose 2 of 4 vertical lines and 2 of 4 horizontal lines: C(4,2)² = 36."],
]),
...m("Cryptarithmetic", [
  ["e","Leading digit","In the cryptarithm SEND + MORE = MONEY, what digit does M represent?",["0","1","9","2"],1,"Two four-digit numbers sum to less than 20000, so the leading digit M of the five-digit result must be 1."],
  ["m","Digit sum","If AB + BA = 121, where A and B are digits, what is A + B?",["10","9","11","12"],2,"(10A + B) + (10B + A) = 11(A + B) = 121, so A + B = 11."],
  ["m","Unknown digit","If 3A + A7 = 103, where A is a single digit and 3A, A7 are two-digit numbers, what is A?",["5","6","4","7"],1,"(30 + A) + (10A + 7) = 37 + 11A = 103, so A = 6 (36 + 67 = 103)."],
  ["m","Word addition","In TWO + TWO = FOUR, with T = 7, W = 3 and O = 4, what is the digit U?",["8","7","2","6"],3,"W + W = 3 + 3 = 6 with no carry, so U = 6. (734 + 734 = 1468.)"],
  ["h","Automorphic number","A two-digit number AB (A ≠ 0) has a square that ends in the same two digits AB. If A + B = 13, what is AB?",["25","56","76","96"],2,"The two-digit numbers whose squares end in themselves are 25 and 76. Only 76 has digit sum 13 (76² = 5776)."],
]),
];
