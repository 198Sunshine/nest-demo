#模块间循环导入的问题
###使用forwardRef引入解决
 ```javascript
 // user.module
  @Module({
      imports: [
        TypeOrmModule.forFeature([UserEntity]),
        forwardRef(() => AuthModule),
      ],
      // controllers: [UserController, UserNoAuthController],
      // providers: [UserService],
      // exports: [UserService],
})
export class UserModule {}
```

```javascript
  // user.service
    @Injectable()
    export class UserService {
      constructor(
        @Inject(forwardRef(() => AuthService))
          private readonly AuthService: AuthService
    ) {}
}

```
