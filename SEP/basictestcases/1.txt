1 REM Program to sum 1 to a
10 LET a = 10
20 LET b = -1
30 IF a < 1 THEN 60
40 LET b = b + a
45 LET a = a - 1
46 LET b = 1 + b * 2
47 LET b = (b - 1) / 2
50 GOTO 30
60 PRINT b + 1
70 END
