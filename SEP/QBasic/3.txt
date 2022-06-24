3 REM Given N, print the smallest X that 2**X-1 >= N
9 INPUT N
16 LET X = 1
17 LET SUM = 2 ** X - 1
18 IF SUM < 0 THEN 2019
20 IF SUM > N THEN 11199
25 LET X = X + 1
44 LET SUM = 2 ** X -1
50 GOTO 17
11199 PRINT (X * 2 + 2) / 2 - 1
2019 REM This should never be executed.
2020 PRINT 2020 + (-2) + 3
2021 END
22 IF SUM < N THEN 11199
22 IF SUM = N THEN 11199
