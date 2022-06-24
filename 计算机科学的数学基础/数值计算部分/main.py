import matplotlib.pyplot as plt
import numpy as np
import cv2
import scipy.integrate as si
from numpy import zeros
import math
from scipy.linalg import lu as lu
from texttable import Texttable
import pandas as pd

'Problem 2:'
mean = [0, 1, 2]
var = [1, 2, 3]
x = np.linspace(mean[0] - 3 * var[0], mean[0] + 3 * var[0], 1000)
y = np.exp(-(x - mean[0]) ** 2 / (2 * var[0] ** 2)) / (np.sqrt(2 * np.pi) * var[0])
x1 = np.linspace(mean[1] - 3 * var[1], mean[1] + 3 * var[1], 1000)
y1 = np.exp(-(x1 - mean[1]) ** 2 / (2 * var[1] ** 2)) / (np.sqrt(2 * np.pi) * var[1])
x2 = np.linspace(mean[2] - 3 * var[2], mean[2] + 3 * var[2], 1000)
y2 = np.exp(-(x2 - mean[2]) ** 2 / (2 * var[2] ** 2)) / (np.sqrt(2 * np.pi) * var[2])
plt.plot(x, y, label = "μ=0,sigma=1")
plt.plot(x1, y1, label = "μ=1,sigma=2")
plt.plot(x2, y2, label = "μ=2,sigma=3")
plt.legend()
plt.grid(True)
plt.show()


def f(x):
    y = np.exp(-(x - mean[0]) ** 2 / (2 * var[0] ** 2)) / (np.sqrt(2 * np.pi) * var[0])
    return y


def f1(x):
    y = np.exp(-(x - mean[1]) ** 2 / (2 * var[1] ** 2)) / (np.sqrt(2 * np.pi) * var[1])
    return y


def f2(x):
    y = np.exp(-(x - mean[2]) ** 2 / (2 * var[2] ** 2)) / (np.sqrt(2 * np.pi) * var[2])
    return y


area1 = si.quad(f, mean[0] - 3 * var[0], mean[0] + 3 * var[0])[0]
print("积分1=", area1)

area2 = si.quad(f1, mean[1] - 3 * var[1], mean[1] + 3 * var[1])[0]
print("积分2=", area2)

area3 = si.quad(f2, mean[2] - 3 * var[2], mean[2] + 3 * var[2])[0]
print("积分2=", area3)

'Problem 3:'
M = 16
N = 16
m = M - 1
n = N - 1


def func_1(x):#要拟合的函数
    y = float(1 / (1 + x ** 2))
    return y


def get_v(m1):#获取矩阵V的函数（m=n）
    x_i_1 = np.arange(0.0, m1, 1)
    arr_1 = np.arange(0, m1, 1)
    for k in arr_1:
        x_i_1[k] = k / (m1 - 1)
    ans = np.arange(0.0, m1 * m1, 1).reshape(m1, m1)
    for i1 in arr_1:
        for i2 in arr_1:
            ans[i1][i2] = x_i_1[i1] ** i2
    return ans


def func_2(x, idx, n1):#计算矩阵F某个点的数值的函数
    if idx <= n1 / 2:
        y_2 = math.sin(idx * np.pi * x)
    else:
        y_2 = math.cos((idx - n1 / 2) * x * np.pi)
    return y_2


def get_f(m2):#获取矩阵F的函数(m=n)
    f = np.arange(0.0, m2 * m2, 1).reshape(m2, m2)
    x = np.arange(0.0, m2, 1)
    arr_2 = np.arange(0, m2, 1)
    for s in arr_2:
        x[s] = s / (m2 - 1)
    for s1 in arr_2:
        for s2 in arr_2:
            f[s1][s2] = func_2(x[s1], s2 + 1, m2)
    return f

'linear system 1:'

func_1_i = np.arange(0.0, M, 1)

x_i = np.arange(0.0, M, 1)

arr = np.arange(0, m, 1)

for i in arr:
    x_i[i] = i / m
    (func_1_i[i]) = func_1(x_i[i])

func_1_i[m] = func_1(1)

v1 = get_v(M)

p, l, u = lu(a=v1, permute_l=False, overwrite_a=False, check_finite=True)#进行lu分解，注意Python中结果为PLU

y = np.linalg.solve(np.dot(p, l), func_1_i[:, np.newaxis])

c = np.linalg.solve(u, y)#根据LU分解结果生成最终解

print("linear system 1 的c的结果为:\n", c)

red = np.dot(v1, c) - func_1_i[:, np.newaxis]

red_norm = np.linalg.norm(red, 2)#计算偏差的二范数

print("norm1:\n", red_norm)
'linear system 2:'#这部分与上述同理，就是矩阵变为了矩阵F

F1 = np.arange(0.0, M * M, 1).reshape(M, M)

func_2_i = np.arange(0.0, M, 1)

x_i_2 = np.arange(0.0, M, 1)

arr = np.arange(0, M, 1)

for i in arr:
    x_i_2[i] = i / m
    func_2_i[i] = func_1(x_i_2[i])

F1 = get_f(M)

p1, l1, u = lu(a=F1, permute_l=False, overwrite_a=False, check_finite=True)

y2 = np.linalg.solve(np.dot(p1, l1), func_2_i[:, np.newaxis])

c2 = np.linalg.solve(u, y2)

print("linear system 2 的c的结果为:\n", c2)

red_2 = np.dot(F1, c2) - func_2_i[:, np.newaxis]

red_norm_2 = np.linalg.norm(red_2, 2)

print("norm 2:\n", red_norm_2)

m_s = np.arange(4, 34, 2)

cond_v = np.arange(0.0, 15, 1)

cond_f = np.arange(0.0, 15, 1)

arr_cond = np.arange(0, 15, 1)

for i in arr_cond:
    v_i = get_v(m_s[i])
    f_i = get_f(m_s[i])
    cond_v[i] = np.linalg.cond(v_i)
    cond_f[i] = np.linalg.cond(f_i)#计算条件数

cond_y_v = [math.log(a, 10) for a in cond_v]

cond_y_f = [math.log(a, 10) for a in cond_f]


plt.plot(m_s, cond_y_v, label = "cond_v")

plt.plot(m_s, cond_y_f, label = "cond_f")

plt.legend()

plt.grid(True)

plt.show()


def is_pos_def(a):
    return np.all(np.linalg.eigvals(a) > 0)


A_v = np.arange(0.0, 15, 1)

A_f = np.arange(0.0, 15, 1)

for i in arr_cond:
    v_i = get_v(m_s[i])
    f_i = get_f(m_s[i])
    a = np.dot(np.transpose(v_i), v_i)
    b = np.dot(np.transpose(f_i), f_i)
    A_v[i] = is_pos_def(a)
    A_f[i] = is_pos_def(b)#判断是否为正定矩阵

data = np.arange(0, 75, 1).reshape(15, 5)

arr_x = np.arange(0, 5, 1)

arr_y = np.arange(0, 15, 1)

for i in arr_y:
    data[i][0] = m_s[i]
    data[i][1] = A_v[i]
    data[i][2] = A_f[i]
    data[i][3] = cond_y_v[i]
    data[i][4] = cond_y_f[i]

columns = ["N", "isposdef(A_v)", "isposdef(A_f)", "cond_v", "cond_f"]

df = pd.DataFrame(data=data,columns=columns)#开始绘制结果表格

print("结果表格")

print(df)

print(cond_v)

print(cond_f)
'''

'''
b = np.arange(0.0, 8, 1)

for i in np.arange(0, 8, 1):
    b[i] = func_1(i / 7)

v_8 = get_v(m_s[2])

f_8 = get_f(m_s[2])
v_8_1 = np.dot(np.transpose(v_8), v_8)
l_v = np.linalg.cholesky(v_8_1)#进行cholesky分解

y_v8 = np.linalg.solve(l_v, np.dot(np.transpose(v_8), b))

c_v8 = np.linalg.solve(np.transpose(l_v), y_v8)#利用分解结果计算最终解

print("解1：", c_v8)

norm_v8 = np.linalg.norm(np.dot(v_8, c_v8) - b)

print("norm_v8 = ", norm_v8)

f_8_1 = np.dot(np.transpose(f_8), f_8)

l_f = np.linalg.cholesky(f_8_1)

y_f8 = np.linalg.solve(l_f, np.dot(np.transpose(f_8), b))

c_f8 = np.linalg.solve(np.transpose(l_f), y_f8)

print("解2：", c_f8)

norm_f8 = np.linalg.norm(np.dot(f_8, c_f8) - b)

print("norm_f8 = ", norm_f8)

'problem 4:'


def get_v_mn(m_v, n_v):#问题4-1：m不等于n时获取v
    x = np.arange(0.0, m_v, 1)
    arr = np.arange(0, m_v, 1)
    b_v = np.arange(0.0, m_v, 1)
    for i_v in arr:
        x[i_v] = i_v / (m_v - 1)
        b_v[i_v] = func_1(x[i_v])
    arr1 = np.arange(0, n_v, 1)
    ans = np.arange(0.0, m_v * n_v, 1).reshape(m_v, n_v)
    for i_v in arr:
        for j_v in arr1:
            ans[i_v][j_v] = x[i_v] ** j_v
    return ans


def get_f_mn(m_f, n_f):
    ans = np.arange(0.0, m_f * n_f, 1).reshape(m_f, n_f)
    x = np.arange(0.0, m_f, 1)
    arr = np.arange(0, m_f, 1)
    arr1 = np.arange(0, n_f, 1)
    for i_f in arr:
        x[i_f] = i_f / (m_f - 1)
    for i_f in arr:
        for j_f in arr1:
            ans[i_f][j_f] = func_2(x[i_f], j_f + 1, n_f)
    return ans


v_mn_1 = get_v_mn(16, 4)

f_mn_1 = get_f_mn(16, 4)

v_mn_2 = get_v_mn(16, 8)

f_mn_2 = get_f_mn(16, 8)

q1, r1 = np.linalg.qr(v_mn_1)#进行QR分解
q11, r11 = np.linalg.qr(v_mn_2)

b_mn = np.arange(0.0, 16, 1)

for i in np.arange(0, 16, 1):
    b_mn[i] = func_1(i / 15)

c_v_mn = np.linalg.solve(r1, np.dot(np.transpose(q1), b_mn))
c_v_mn_1 = np.linalg.solve(r11, np.dot(np.transpose(q11), b_mn))

#print("qr解1：", c_v_mn)

q2, r2 = np.linalg.qr(f_mn_1)
q22, r22 = np.linalg.qr(f_mn_2)

c_f_mn = np.linalg.solve(r2, np.dot(np.transpose(q2), b_mn))
c_f_mn_1 = np.linalg.solve(r22, np.dot(np.transpose(q22), b_mn))

#print("qr解2：", c_f_mn)

x0 = np.linspace(0.0, 1, 1000)
y0 = 1 / (1 + x0 ** 2)#初始的1/(1+x^2)的图像

x1 = np.arange(0.0, 16, 1)#获取每一个数据点对应的x坐标
for i in np.arange(0, 16, 1):
    x1[i] = i / 15
y1_1 = np.dot(v_mn_1, c_v_mn)
y1_2 = np.dot(f_mn_1, c_f_mn)
y1_3 = np.dot(v_mn_2, c_v_mn_1)
y1_4 = np.dot(f_mn_2, c_f_mn_1)
c_v_mm = get_v_mn(16, 16)#获取问题3.1中的矩阵
c_f_mm = get_f_mn(16, 16)
p1, l1, u1 = lu(a=c_v_mm, permute_l=False, overwrite_a=False, check_finite=True)
bb = np.arange(0.0, 16, 1)
for i in np.arange(0, 16, 1):
    bb[i] = func_1(i / 15)
y_m = np.linalg.solve(np.dot(p1, l1), bb)
c_1 = np.linalg.solve(u1, y_m)
y1_5 = np.dot(c_v_mm, c_1)
p2, l2, u2 = lu(a=c_f_mm, permute_l=False, overwrite_a=False, check_finite=True)
y_m_1 = np.linalg.solve(np.dot(p2, l2), bb)
c_2 = np.linalg.solve(u2, y_m_1)
y1_6 = np.dot(c_f_mm, c_2)
plt.plot(x0, y0, label="initial")
plt.plot(x1, y1_1, label="qr_v_4")
plt.plot(x1, y1_2, label="qr_f_4")
plt.plot(x1, y1_3, label="qr_v_8")
plt.plot(x1, y1_4, label="qr_f_8")
plt.plot(x1, y1_5, label="lu_v_16")
plt.plot(x1, y1_6, label="lu_f_16")
plt.legend()#在一张图中绘制多条曲线
plt.grid(True)
plt.show()
#problem 5:
points1 = [[120, 185], [280, 192], [423, 180], [145, 368], [424, 438]]
points2 = [[42 , 405], [187, 367], [311, 320], [110, 559], [379, 544]]
xs1 = [120, 280, 423, 145, 424]
ys1 = [185, 192, 180, 368, 438]
xs2 = [42, 187, 311, 110, 379]
ys2 = [405, 367, 320, 559, 544]#把两组点的xy分开来存储
xsum1 = 0
ysum1 = 0
xsum2 = 0
ysum2 = 0
for i in np.arange(0, 5, 1):
    xsum1 += points1[i][0]
    ysum1 += points1[i][1]
    xsum2 += points2[i][0]
    ysum2 += points2[i][1]#获取行和和列和
x1x1 = 0
x1y1 = 0
y1y1 = 0
x1x2 = 0
x2y1 = 0
x1y2 = 0
y1y2 = 0
arr = np.arange(0, 5, 1)
for i in arr:
    x1x1 += points1[i][0] * points1[i][0]
    x1y1 += points1[i][0] * points1[i][1]
    y1y1 += points1[i][1] * points1[i][1]
    x1x2 += points1[i][0] * points2[i][0]
    x1y2 += points1[i][0] * points2[i][1]
    x2y1 += points1[i][1] * points2[i][0]
    y1y2 += points1[i][1] * points2[i][1]#计算一些必要的量
m1 = np.zeros((6, 6))
m1[0][0] = xsum1
m1[0][1] = ysum1
m1[0][4] = 5
m1[1][2] = xsum1
m1[1][3] = ysum1
m1[1][5] = 5
m1[2][0] = x1x1
m1[2][1] = x1y1
m1[2][4] = xsum1
m1[3][0] = x1y1
m1[3][1] = y1y1
m1[3][4] = ysum1
m1[4][2] = x1x1
m1[4][3] = x1y1
m1[4][5] = xsum1
m1[5][2] = x1y1
m1[5][3] = y1y1
m1[5][5] = ysum1#设置参数矩阵的值
c_img = [xsum2, ysum2, x1x2, x2y1, x1y2, y1y2]#获取结果矩阵
A_img = np.zeros((2, 2))
B_img = np.zeros((2, 1))
D_img = np.zeros((2, 3))
'lu分解:'
p_img, l_img, u_img = lu(a=m1, permute_l=False, overwrite_a=False, check_finite=True)
y_img_lu = np.linalg.solve(np.dot(p_img, l_img), c_img)
ans_img_lu = np.linalg.solve(u_img, y_img_lu)
'''
'cholesky分解:'
l_cho_img = np.linalg.cholesky(np.dot(np.transpose(m1), m1))
y_img_lu = np.linalg.solve(l_cho_img, np.dot(np.transpose(m1), c_img))
ans_img_lu = np.linalg.solve(np.transpose(l_cho_img), y_img_lu)
'qr分解1:'
q_img, r_img = np.linalg.qr(m1)
ans_img_lu = np.linalg.solve(r_img, np.dot(np.transpose(q_img), c_img))
'''
A_img[0][0] = ans_img_lu[0]
A_img[0][1] = ans_img_lu[1]
A_img[1][0] = ans_img_lu[2]
A_img[1][1] = ans_img_lu[3]
B_img[0][0] = ans_img_lu[4]
B_img[1][0] = ans_img_lu[5]
D_img[0][0] = ans_img_lu[0]
D_img[0][1] = ans_img_lu[1]
D_img[0][2] = ans_img_lu[4]
D_img[1][0] = ans_img_lu[2]
D_img[1][1] = ans_img_lu[3]
D_img[1][2] = ans_img_lu[5]#生成矩阵A与仿射变换矩阵D
img1 = cv2.imread('1.png', cv2.IMREAD_GRAYSCALE)
img2 = cv2.imread('2.png', cv2.IMREAD_GRAYSCALE)
#cv2.imshow('img', img1)
#cv2.waitKey(0)
sp = img2.shape
height = sp[0]
width = sp[1]
img1_dst = cv2.warpAffine(img1, D_img, (width, height))
img1_dst = cv2.resize(img1_dst, (img2.shape[1], img2.shape[0]))
imgAddW1 = cv2.addWeighted(img1_dst, 0.5, img2, 0.5, 0)
#cv2.namedWindow('img', cv2.WINDOW_NORMAL)
#cv2.imshow("img",img1_dst)
output = np.hstack((img2, imgAddW1))
cv2.imshow("img", output)
cv2.waitKey(0)


