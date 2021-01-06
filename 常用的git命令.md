#### 常用命令

1. **git rm <文件>** 删除文件

2. git rebase -i A  处理A之后的commit — 可用于删除中途某一次的commit

3. git cherry-pick C 单独抽取c

4. git config  设置用户信息

5. git add || git add . 添加到暂存区

6. git reset HEAD 撤销暂存区的全部文件或单个

7. git reset A --hard. 回退到A

8. git commit 

9. ```bash
   # 使用一次新的commit，替代上一次提交
   # 如果代码没有任何新变化，则用来改写上一次commit的提交信息
   $ git commit --amend -m [message]
   
   # 重做上一次commit，并包括指定文件的新变化
   $ git commit --amend [file1] [file2] ...
   ```

10. git branch 查看分支 git branch -a 查看远程分支 

  11. git branch -d 删除分支 git push origin --delete 删除远程分支

  12. git checkout -b 创建并切换到新分支

 13. git checkout 切换分支

 14. git merge 合并分支

 15. git log 查看commit记录 git log -S 搜索某次commit

 16. git diff 显示区别  **git diff <文件>** 查看修改内容

 17. git fetch 更新远程

 18. **git stash** 藏匿 （当前分支所有没有 commit 的代码先暂存起来）

     **git stash list** 查看藏匿记录

     **git stash clear** 清空所有藏匿记录

     **git stash pop** 还原并移除(等同以下两个操作)

     **git stash apply** 还原藏匿部分

     **git stash drop** 移除最近一条藏匿记录




#### git提交过程

新建代码库：

1. git init  新建代码库
2. git init workspace 新建目录
3. git clone 克隆项目
4. git status 查看仓库当前的状态，显示有变更的文件。

新建分支

1. git branch -a  列出所有本地分支和远程分支
2. git branch guanliping 新建分支，停留在当前分支
3. git checkout -b  guanliping  新建并切换到新建的分支
4. git checkout guanliping 切换分支

提交合并代码

1. 在自己的分支提交代码git add .   git commit
2. git status 查看仓库当前的状态，显示有变更的文件。
3. git checkout + 对方的分支  
4. git pull 更新远程仓库代码， 会显示修改内容，有提示  git branch --set-upstream-to=origin/<branch> detail
5. git checkout master 回到主分支 
6. git merge 1  合并我的分支  会提示对应修改的代码
   git merge 2   合并他的分支  会提示对应修改的代码
7. git pull origin master   提交代码 合并完成
8. git pull --rebase origin master
   –rebase的作用是取消掉本地库中刚刚的commit，并把他们接到更新后的版本库之中。

### 增加/删除文件

```markdown
# 添加指定文件到暂存区
$ git add [file1] [file2] ...

# 添加指定目录到暂存区，包括子目录
$ git add [dir]

# 添加当前目录的所有文件到暂存区
$ git add .

# 添加每个变化前，都会要求确认
# 对于同一个文件的多处变化，可以实现分次提交
$ git add -p

# 删除工作区文件，并且将这次删除放入暂存区
$ git rm [file1] [file2] ...

# 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file]

# 改名文件，并且将这个改名放入暂存区
$ git mv [file-original] [file-renamed]
```

### 分支

```markdown
# 列出所有本地分支
$ git branch

# 列出所有远程分支
$ git branch -r

# 列出所有本地分支和远程分支
$ git branch -a

# 新建一个分支，但依然停留在当前分支
$ git branch [branch-name]

# 新建一个分支，并切换到该分支
$ git checkout -b [branch]

# 新建一个分支，指向指定commit
$ git branch [branch] [commit]

# 新建一个分支，与指定的远程分支建立追踪关系
$ git branch --track [branch] [remote-branch]

# 切换到指定分支，并更新工作区
$ git checkout [branch-name]

# 切换到上一个分支
$ git checkout -

# 建立追踪关系，在现有分支与指定的远程分支之间
$ git branch --set-upstream [branch] [remote-branch]

# 合并指定分支到当前分支
$ git merge [branch]

# 选择一个commit，合并进当前分支
$ git cherry-pick [commit]

# 删除分支
$ git branch -d [branch-name]

# 删除远程分支
$ git push origin --delete [branch-name]
$ git branch -dr [remote/branch]
```

### 代码提交

```markdown
# 提交暂存区到仓库区
$ git commit -m [message]

# 提交暂存区的指定文件到仓库区
$ git commit [file1] [file2] ... -m [message]

# 提交工作区自上次commit之后的变化，直接到仓库区
$ git commit -a

# 提交时显示所有diff信息
$ git commit -v

# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]

# 重做上一次commit，并包括指定文件的新变化
$ git commit --amend [file1] [file2] ...
```

### 查看信息

```markdown
# 显示有变更的文件
$ git status

# 显示当前分支的版本历史
$ git log

# 显示commit历史，以及每次commit发生变更的文件
$ git log --stat

# 搜索提交历史，根据关键词
$ git log -S [keyword]

# 显示某个commit之后的所有变动，每个commit占据一行
$ git log [tag] HEAD --pretty=format:%s

# 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
$ git log [tag] HEAD --grep feature

# 显示某个文件的版本历史，包括文件改名
$ git log --follow [file]
$ git whatchanged [file]

# 显示指定文件相关的每一次diff
$ git log -p [file]

# 显示过去5次提交
$ git log -5 --pretty --oneline

# 显示所有提交过的用户，按提交次数排序
$ git shortlog -sn

# 显示指定文件是什么人在什么时间修改过
$ git blame [file]

# 显示暂存区和工作区的差异
$ git diff

# 显示暂存区和上一个commit的差异
$ git diff --cached [file]

# 显示工作区与当前分支最新commit之间的差异
$ git diff HEAD

# 显示两次提交之间的差异
$ git diff [first-branch]...[second-branch]

# 显示今天你写了多少行代码
$ git diff --shortstat "@{0 day ago}"

# 显示当前分支的最近几次提交
$ git reflog
```

