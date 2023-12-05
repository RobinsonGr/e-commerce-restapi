import{e as V,i as O,f as w,n as S,_ as q}from"./pinia-52966849.js";import{_ as R,a as C}from"./option-01ad5267.js";import{_ as D,a as T}from"./form-5c85c71c.js";import{_ as y}from"./dialog-71b4dde9.js";import{_ as p}from"./checkbox-e8fa3f1b.js";import{u as b}from"./umy-table.common-99f56390.js";import{D as c}from"./DatabaseType-faf98b82.js";import{S as d,d as A,i as j,e as _,t as K,b as $,E as Q,c as f,a as X}from"./stringUtil-3bd42e65.js";import{i as B}from"./viewUtil-374bd9b7.js";import{s as F,e as g}from"./notify-f3e13467.js";import{A as x}from"./arrayUtil-9f534a50.js";import"./scrollbar-a6f6a3c9.js";import"./index-5a66004d.js";import"./focus-34de79c8.js";import"./checkbox-cdcb048c.js";import"./index-f37b6d04.js";import"./index-3e66c890.js";class N{dropIndex(e,t){throw new Error("Method not implemented.")}showVersion(){return null}showIndex(e,t){return null}createIndex(e){return null}showDatabases(){return null}updateUser(e){return null}showCollations(){return null}showPackages(e){return null}showChecks(e,t){return null}showPartitions(e,t){return null}showActualPartitions(e,t){return null}showForeignKeys(e,t){return null}updateColumnSql(e){throw new Error("Method not implemented.")}showExternalTables(e){return`select foreign_table_name "name",foreign_server_name "server",foreign_server_catalog "server_db" from information_schema.foreign_tables where foreign_table_schema='${e}';`}showEvents(e){return`SELECT EVENT_NAME "name" FROM information_schema.EVENTS where EVENT_SCHEMA='${e}' ORDER BY EVENT_NAME;`}dropEventTemplate(e){return`DROP EVENT IF EXISTS ${e};`}eventTemplate(){return`CREATE EVENT event_name$1
ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 HOUR
DO
BEGIN
    SELECT now()$2;
END;`}pingDataBase(e,t){return null}dropTriggerTemplate(e){return`DROP TRIGGER IF EXISTS ${e}`}}class J extends N{showVersion(){return"select version() server_version"}createIndex(e){const t=e.indexType||"btree";return`CREATE INDEX ${e.column}_${new Date().getTime()}_index ON ${e.table} USING ${t} (${e.column})`}dropIndex(e,t){return`DROP INDEX ${t}`}showIndex(e,t){return`select name index_name,is_in_sorting_key indexdef  FROM system.columns WHERE database = '${e}' and table ='${t}' and indexdef=1`}variableList(){return"select name , value as setting,description from system.settings s "}statusList(){return"select name as db , engine as status from system.databases d "}processList(){return`
    SELECT query_id AS "Id", user AS "User", client_hostname AS "Host", port AS "Port", current_database AS "db", query AS "Command", os_user AS "State", addSeconds(now(), elapsed) AS "Time", elapsed AS "Info"
    FROM system.processes p 
    ORDER BY elapsed desc`}addColumn(e,t){return`ALTER TABLE ${e} 
    ADD COLUMN [column] [type]`}createUser(){return"CREATE USER [name] WITH PASSWORD 'password'"}updateColumn(e,t){const{name:n,type:r,comment:o,nullable:s,defaultValue:l}=t;return`-- change column type
ALTER TABLE ${e} 
    ALTER COLUMN ${n} TYPE ${r};
-- change column name
ALTER TABLE ${e}  
    RENAME COLUMN ${n} TO [newColumnName]`}updateColumnSql(e){const{columnName:t,columnType:n,newColumnName:r,comment:o,table:s,defaultValue:l,oldRow:i}=e;return console.log(n,i),new d("",`
`).if(n!=i.type,`ALTER TABLE ${s} ALTER COLUMN ${t} TYPE ${n};`).if(l&&l!=i.defaultValue,`ALTER TABLE ${s} MODIFY COLUMN ${t} DEFAULT ${A(l,n)};`).if(o&&o!=i.comment,`ALTER TABLE ${s} MODIFY COLUMN ${t} COMMENT '${o}';`).if(t!=r,`ALTER TABLE ${s} RENAME COLUMN ${t} TO ${r};`).toString()}showUsers(){return"SELECT * FROM system.users"}pingDataBase(e){return"select 1"}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:o}=e;let s="";return o&&o!=r&&(s=`ALTER TABLE ${t} MODIFY COMMENT '${o}';`),n&&t!=n&&(s+=`ALTER TABLE ${t} RENAME TO ${n};`),s}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE "',TABLE_NAME, '";') trun FROM INFORMATION_SCHEMA.TABLES WHERE  table_schema ='${e}' AND table_type='BASE TABLE';`}createDatabase(e){return"CREATE DATABASE $1"}showTableSource(e,t){return`SELECT create_table_query as "Create Table",name as table_name,'definition' as view_definition from system.tables WHERE database='${e}' and name='${t}'`}showViewSource(e,t){return`SELECT create_table_query as "Create View",name as table_name,'definition' as view_definition from system.tables WHERE database='${e}' and name='${t}'`}showProcedureSource(e,t){return"select number from system.numbers where 1=0"}showFunctionSource(e,t){return"select number from system.numbers where 1=0"}showTriggerSource(e,t){return"select number from system.numbers where 1=0"}showColumns(e,t){return`select name,type, null as maxLength,default_expression as defaultValue,is_in_primary_key as key from system.columns c where database='${e}' and table='${t}' `}showTriggers(e){return"select number from system.numbers where 1=0"}showProcedures(e){return"select number from system.numbers where 1=0"}showFunctions(e){return`select name as "ROUTINE_NAME" from system.functions  where origin !='System'`}showViews(e){return`select name ,engine as type from system.tables where database='${e}' and engine = 'View' ORDER BY name`}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n}`}countSql(e,t){return`SELECT count(*) FROM ${e}.${t}`}showTables(e){return`select name, engine as type from system.tables where database='${e}' and engine <> 'View' ORDER BY name`}showDatabases(){return"SELECT name as Database FROM system.databases where name not in ('information_schema','INFORMATION_SCHEMA') order by name ASC"}showSchemas(){return this.showDatabases()}tableTemplate(){return`CREATE TABLE table_name$1(  
    id UUID,
    create_time DATETIME,
    name$2 String
)
ENGINE = MergeTree()
ORDER BY (id)
PRIMARY KEY(id);`}viewTemplate(){return`CREATE VIEW $1
AS
SELECT * FROM $2`}procedureTemplate(){return"select number from system.numbers where 1=0"}triggerTemplate(){return"select number from system.numbers where 1=0"}dropTriggerTemplate(e){return"select number from system.numbers where 1=0"}functionTemplate(){return"CREATE FUNCTION [func_name] AS (a, b, c) -> a * b * c;"}}class z extends N{showVersion(){return""}createIndex(e){return`ALTER TABLE ${e.table} ADD ${e.type||"key"} ("${e.column||"[column]"}")`}dropIndex(e,t){return`ALTER TABLE ${e} DROP INDEX "${t}"`}showIndex(e,t){return`SELECT column_name "column_name",index_name "index_name",index_type "index_type",non_unique=0 "isUnique" FROM INFORMATION_SCHEMA.STATISTICS WHERE table_schema='${e}' and table_name='${t}';`}variableList(){return"show global VARIABLES"}statusList(){return"show global status"}processList(){return"show processlist"}addColumn(e,t){const n=t?` AFTER "${t}"`:"";return`ALTER TABLE ${e} 
    ADD COLUMN [column] [type] COMMENT ''${n};`}createUser(){return`CREATE USER 'username'@'%' IDENTIFIED BY 'password';
-- Grant select privilege to all databases;
GRANT SELECT ON *.* TO 'username'@'%' WITH GRANT OPTION;
-- Grant all privileges to all databases;
GRANT ALL PRIVILEGES ON *.* TO 'username'@'%' WITH GRANT OPTION;`}updateUser(e){return`update mysql.user set 
    password = PASSWORD("newPassword")
    where User = '${e}';
FLUSH PRIVILEGES;
-- since mysql version 5.7, password column need change to authentication_string=PASSWORD("newPassword")`}updateColumn(e,t){var u;const{name:n,type:r,comment:o,nullable:s,defaultValue:l,extra:i,character_set_name:E,collation_name:m}=t;return new d(`ALTER TABLE ${e}`).append(`
	CHANGE ${n} ${n} ${r}`).if(E,`CHARACTER SET ${E}`).if(m,`COLLATE ${m}`).if(s!="YES","NOT NULL").if((u=i==null?void 0:i.toLowerCase())==null?void 0:u.includes("auto_increment"),"AUTO_INCREMENT").if(o,`COMMENT '${o}'`).if(l,`DEFAULT ${l=="CURRENT_TIMESTAMP"?l:`'${l}'`}`).toString()}updateColumnSql(e){const{table:t,columnName:n,name:r,type:o,isNotNull:s,isAutoIncrement:l,comment:i,defaultValue:E,character_set_name:m,collation_name:u}=e;return new d(`ALTER TABLE "${t}"`).append(`
	CHANGE "${n}" "${r}" ${o}`).if(m,`CHARACTER SET ${m}`).if(u,`COLLATE ${u}`).if(s,"NOT NULL").if(l,"AUTO_INCREMENT").if(i,`COMMENT '${i}'`).if(E,`DEFAULT ${E=="CURRENT_TIMESTAMP"?E:`'${E}'`}`).append(";").toString()}showUsers(){return"SELECT concat(user,'@',host) user FROM mysql.user;"}pingDataBase(e){return e?null:"select 1"}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:o}=e;let s="";return o&&o!=r&&(s=`ALTER TABLE "${t}" COMMENT = '${o}';`),n&&t!=n&&(s+=`ALTER TABLE "${t}" RENAME TO "${n}";`),s}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE "',table_schema,'"."',TABLE_NAME, '";') trun FROM INFORMATION_SCHEMA.TABLES where  table_schema ='${e}' and TABLE_TYPE<>'VIEW';`}createDatabase(e){return"CREATE DATABASE $1;"}showTableSource(e,t){return`SHOW CREATE TABLE "${e}"."${t}";`}showViewSource(e,t){return`SHOW CREATE VIEW  "${e}"."${t}";`}showProcedureSource(e,t){return`SHOW CREATE PROCEDURE "${e}"."${t}";`}showFunctionSource(e,t){return`SHOW CREATE FUNCTION "${e}"."${t}";`}showTriggerSource(e,t){return`SHOW CREATE TRIGGER "${e}"."${t}";`}showColumns(e,t){return`SELECT COLUMN_NAME name,DATA_TYPE simpleType, DATA_TYPE type, IS_NULLABLE nullable 
            FROM information_schema.columns WHERE table_schema = '${e}' AND table_name = '${t}' ORDER BY ORDINAL_POSITION;`}showTriggers(e,t){const n=t?` AND EVENT_OBJECT_TABLE='${t}'`:"";return`SELECT TRIGGER_NAME FROM information_schema.TRIGGERS WHERE TRIGGER_SCHEMA = '${e}' ${n} ORDER BY TRIGGER_NAME;`}showProcedures(e){return`SELECT ROUTINE_NAME FROM information_schema.routines WHERE ROUTINE_SCHEMA = '${e}' and ROUTINE_TYPE='PROCEDURE' ORDER BY ROUTINE_NAME`}showFunctions(e){return`SELECT ROUTINE_NAME FROM information_schema.routines WHERE ROUTINE_SCHEMA = '${e}' and ROUTINE_TYPE='FUNCTION' ORDER BY ROUTINE_NAME`}showViews(e){return`SELECT TABLE_NAME name FROM information_schema.VIEWS  WHERE TABLE_SCHEMA = '${e}' ORDER BY TABLE_NAME`}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n};`}countSql(e,t){return`SELECT count(*) FROM ${t};`}showTables(e){return`SELECT TABLE_COMMENT "comment",TABLE_NAME "name",TABLE_ROWS "table_rows",AUTO_INCREMENT "auto_increment",row_format "row_format",DATA_LENGTH "data_length",INDEX_LENGTH "index_length" FROM information_schema.TABLES  WHERE TABLE_SCHEMA = '${e}' and TABLE_TYPE<>'VIEW' ORDER BY TABLE_NAME;`}showDatabases(){return'SELECT SCHEMA_NAME "Database" FROM information_schema.schemata ORDER BY "Database";'}showSchemas(){return this.showDatabases()}tableTemplate(){return`CREATE TABLE table_name(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME COMMENT 'Create Time',
    update_time DATETIME COMMENT 'Update Time',
    content VARCHAR(255) COMMENT 'content'
) DEFAULT CHARSET UTF8 COMMENT 'newTable';`}viewTemplate(){return`CREATE VIEW view_name$1
AS
SELECT * FROM `}procedureTemplate(){return`CREATE PROCEDURE procedure_name$1()
BEGIN
    $2
END;`}triggerTemplate(){return`CREATE TRIGGER trigger_name$1
[BEFORE/AFTER] [INSERT/UPDATE/DELETE]
ON [table]
FOR EACH ROW BEGIN

END;`}functionTemplate(){return`CREATE FUNCTION function_name$1() RETURNS int
BEGIN
    $2
    return 0;
END;`}}class H extends N{showVersion(){return`select RTRIM(SUBSTR(REPLACE(banner,'Oracle Database ',''),1,3)) "server_version" from v$version where rownum=1`}createIndex(e){const{table:t,column:n}=e;return`CREATE INDEX ${`${t}_${n}`} ON ${t}(${n})`}dropIndex(e,t){return`DROP INDEX ${t}`}showIndex(e,t){return`SELECT COLUMN_NAME "column_name",INDEX_NAME "index_name" from DBA_IND_COLUMNS WHERE TABLE_OWNER='${e}' and TABLE_NAME='${t}'`}variableList(){return"show global VARIABLES"}statusList(){return"show global status"}processList(){return"show processlist"}addColumn(e,t){return`ALTER TABLE ${e} 
    ADD [column] [type];
COMMENT ON COLUMN ${e}.[column] IS 'comment'`}createUser(){return`CREATE USER $1 IDENTIFIED BY [password$2];
GRANT CONNECT TO $1;
ALTER USER $1 quota unlimited on USERS;
        `}updateUser(e){return`ALTER USER ${e} IDENTIFIED BY [new_password]`}updateColumn(e,t){const{name:n,type:r,comment:o,nullable:s,defaultValue:l}=t;return`-- change column type
ALTER TABLE ${e} MODIFY ${n} ${r};
-- change column name
ALTER TABLE ${e} RENAME COLUMN ${n} TO [newColumnName];
COMMENT ON COLUMN ${e}.${n} IS '${o||""}'`}updateColumnSql(e){const{columnName:t,columnType:n,newColumnName:r,comment:o,defaultValue:s,table:l,isNotNull:i,oldRow:E}=e;return new d("","").if(n!=E.type,`ALTER TABLE "${l}" MODIFY "${t}" ${n};`).if(i!=E.isNotNull,`
ALTER TABLE "${l}" MODIFY "${t}"${i?"NOT NULL":"NULL"};`).if(s!=null&&s!=E.defaultValue,`
ALTER TABLE "${l}" MODIFY "${t}" DEFAULT ${s!=null&&s.match(/(:|nextval)/i)?s:`'${s==null?void 0:s.replace(/(^'|'$)/g,"")}'`};`).if(o&&o!=E.comment,`
COMMENT ON COLUMN "${l}"."${t}" is '${o}';`).if(t!=r,`
ALTER TABLE "${l}" RENAME COLUMN "${t}" TO "${r}";`).toString()}showUsers(){return'SELECT username "user" FROM all_users'}pingDataBase(e){return e?`ALTER SESSION SET current_schema = "${e}"`:"select 1"}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:o}=e;let s="";return o&&o!=r&&(s=`COMMENT ON TABLE "${t}" IS '${o}';`),n&&t!=n&&(s+=`ALTER TABLE "${t}" RENAME TO "${n}"`),s}truncateDatabase(e){return`SELECT 'TRUNCATE TABLE "' || owner || '"."' || object_name || '";' trun FROM all_objects where  owner ='${e}' and object_type ='TABLE'`}createDatabase(e){return"CREATE USER $1 IDENTIFIED BY password$2;"}showTableSource(e,t){return""}showViewSource(e,t,n){return n.isMaterial()?`select QUERY "Create View" from ALL_MVIEWS where OWNER='${e}' and mview_name='${t}'`:`SELECT 'CREATE VIEW ' || view_name || ' AS
' || TEXT_VC  "Create View" FROM ALL_VIEWS WHERE OWNER='${e}' AND view_name='${t}'`}showProcedureSource(e,t){return`SELECT 'CREATE ' || LISTAGG(text) within group(order by line) "Create Procedure"
        FROM all_source
       WHERE owner = '${e}'
         AND name  = '${t}'
       ORDER BY line`}showFunctionSource(e,t){return`SELECT 'CREATE ' || LISTAGG(text) within group( order by line ) "Create Function"
        FROM all_source
       WHERE owner = '${e}'
         AND name  = '${t}'
       ORDER BY line`}showTriggerSource(e,t){return`SHOW CREATE TRIGGER \`${e}\`.\`${t}\``}showColumns(e,t){return e?`select
        a.COLUMN_NAME "name",
        a.DATA_DEFAULT "defaultValue",
        a.DATA_TYPE "simpleType",
        a.DATA_PRECISION "precision",
        a.DATA_TYPE || '(' || COALESCE(a.DATA_PRECISION, a.data_length) || ')' "type",
        COALESCE(a.DATA_PRECISION, a.data_length) "maxLength",
        a.NULLABLE "nullable",
        c.CONSTRAINT_TYPE "key",
        cc.COMMENTS "comment"
      from
        all_tab_columns a
        left join all_col_comments cc on a.COLUMN_NAME=cc.COLUMN_NAME and a.OWNER=cc.OWNER and a.table_name=cc.table_name
        left join ALL_CONS_COLUMNS b on a.COLUMN_NAME=b.COLUMN_NAME and a.OWNER=b.OWNER and a.table_name=b.table_name
        left join DBA_CONSTRAINTS c on b.CONSTRAINT_NAME=c.CONSTRAINT_NAME 
      where
        a.owner = '${e}'
        and a.table_name = '${t}'`:`select
a.COLUMN_NAME "name",
a.DATA_DEFAULT "defaultValue",
a.DATA_TYPE "simpleType",
a.DATA_PRECISION "precision",
a.DATA_TYPE || '(' ||  COALESCE(a.DATA_PRECISION, a.data_length) || ')' "type",
COALESCE(a.DATA_PRECISION, a.data_length) "maxLength",
a.NULLABLE "nullable",
c.CONSTRAINT_TYPE "key",
cc.COMMENTS "comment"
from
    user_tab_columns a
    left join user_col_comments cc on a.COLUMN_NAME = cc.COLUMN_NAME and a.table_name = cc.table_name
    left join user_CONS_COLUMNS b on a.COLUMN_NAME = b.COLUMN_NAME and a.table_name = b.table_name
    left join user_constraints c on b.CONSTRAINT_NAME = c.CONSTRAINT_NAME and a.table_name = c.table_name
where
a.table_name = '${t}'`}showChecks(e,t){return`SELECT
        c.constraint_name "name",
        c.search_condition "clause"
    FROM
        all_constraints c
    WHERE
        c.owner = '${e}' and
        c.table_name = '${t}'
        AND c.constraint_type = 'C';`}showForeignKeys(e,t){let n=`select
        b.CONSTRAINT_NAME "constraint_name",
        b.COLUMN_NAME "column_name",
        c_pk.table_name "referenced_table",
        b_pk.COLUMN_NAME "referenced_column"
    from ALL_CONS_COLUMNS b
        join ALL_CONSTRAINTS c on b.owner=c.owner and b.CONSTRAINT_NAME = c.CONSTRAINT_NAME
        JOIN all_constraints c_pk ON c.r_owner = c_pk.owner AND c.r_constraint_name = c_pk.constraint_name
        join ALL_CONS_COLUMNS b_pk on b_pk.CONSTRAINT_NAME = c_pk.CONSTRAINT_NAME
    where
        b.owner = '${e}' and
        b.table_name = '${t}'
        and c.CONSTRAINT_TYPE = 'R';`;return e||(n=n.replace(/all_/ig,"USER_").replace("b.owner = 'undefined' and","")),n}showTriggers(e,t){const n=t?` AND TABLE_NAME='${t}'`:"";return`SELECT * FROM all_triggers WHERE TABLE_OWNER='${e}' ${n} ORDER BY TRIGGER_NAME`}showPackages(e){return`SELECT object_name "name" FROM ALL_OBJECTS WHERE OBJECT_TYPE IN ('PACKAGE') and owner='${e}' ORDER BY "name"`}showProcedures(e){return`select object_name "ROUTINE_NAME" from all_objects where object_type = 'PROCEDURE' and owner='${e}' ORDER BY "ROUTINE_NAME"`}showFunctions(e){return`select object_name "ROUTINE_NAME" from all_objects where object_type = 'FUNCTION' and owner='${e}' ORDER BY "ROUTINE_NAME"`}showViews(e,t){return`select object_type "type",object_name "name" from all_objects where object_type in ('VIEW','MATERIALIZED VIEW') and owner='${t}' ORDER BY "type","name"`}buildPageSql(e,t,n){return`SELECT * FROM ${t} WHERE ROWNUM <= ${n}`}countSql(e,t){return`SELECT count(*) FROM ${t}`}showTables(e,t){return`select t.table_name "name",nvl(num_rows,-1)  "table_rows",c.COMMENTS "comment" from all_tables t
        join ALL_TAB_COMMENTS c on t.OWNER = c.OWNER and t.TABLE_NAME = c.TABLE_NAME
        join all_objects o on t.OWNER = o.OWNER and t.TABLE_NAME = o.object_name and o.object_type='TABLE'
        where t.owner='${t}' ORDER BY "name"`}showDatabases(){return'select username as "Database" from sys.all_users order by username'}showSchemas(){return'select username as "Database" from sys.all_users order by username'}tableTemplate(){return`CREATE TABLE table_name$1(  
    id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    create_time DATE,
    name$2 VARCHAR2(255)
);
COMMENT ON TABLE table_name$1 IS '$3';
COMMENT ON COLUMN table_name$1.$2 IS '$4'`}viewTemplate(){return`CREATE VIEW view_name$1
AS
SELECT * FROM $2`}procedureTemplate(){return`CREATE PROCEDURE proc_name$1(x IN OUT NUMBER, y OUT NUMBER)
IS
BEGIN
   $2
   y:=4 * x;
END;`}triggerTemplate(){return`CREATE TRIGGER trigger_name 
[BEFORE/AFTER] [INSERT/UPDATE/DELETE]
ON [table]
FOR EACH ROW BEGIN

END`}functionTemplate(){return`CREATE FUNCTION fun_name$1(x IN NUMBER) 
RETURN NUMBER 
BEGIN 
    $2
    RETURN x*2;
END;`}}class Z extends H{showVersion(){return`SELECT REPLACE(banner,'DM Database Server 64 ','') "server_version"  FROM v$version where rownum=1;`}createIndex(e){const{table:t,column:n="$2"}=e;return`CREATE INDEX ${`${t}_${n}`} ON ${t}(${n});`}dropIndex(e,t){return`DROP INDEX ${t};`}showIndex(e,t){return`SELECT COLUMN_NAME "column_name",INDEX_NAME "index_name" from DBA_IND_COLUMNS WHERE TABLE_OWNER='${e}' and TABLE_NAME='${t}';`}variableList(){return"show global VARIABLES"}statusList(){return"show global status"}processList(){return"show processlist"}addColumn(e,t){return`ALTER TABLE ${e} 
    ADD COLUMN $1 $2;
COMMENT ON COLUMN ${e}.$3 IS 'comment$4';`}createUser(){return"CREATE USER $1 IDENTIFIED BY [password]$2;"}updateUser(e){return`ALTER USER ${e} IDENTIFIED BY [new_password];`}updateColumn(e,t){const{name:n,type:r,comment:o,nullable:s,defaultValue:l}=t;return`-- change column type
ALTER TABLE ${e} MODIFY ${n} ${r};
-- change column name
ALTER TABLE ${e} RENAME COLUMN ${n} TO [newColumnName];
COMMENT ON COLUMN ${e}.${n} IS '${o||""}';`}updateColumnSql(e){const{columnName:t,columnType:n,newColumnName:r,comment:o,defaultValue:s,table:l,isNotNull:i,oldRow:E}=e;return new d("","").if(n!=E.type,`ALTER TABLE "${l}" MODIFY "${t}" ${n};`).if(i!=E.isNotNull,`
ALTER TABLE "${l}" MODIFY "${t}"${i?"NOT NULL":"NULL"};`).if(s!=null&&s!=E.defaultValue,`
ALTER TABLE "${l}" MODIFY "${t}" DEFAULT ${s!=null&&s.match(/(:|nextval)/i)?s:`'${s==null?void 0:s.replace(/(^'|'$)/g,"")}'`};`).if(o&&o!=E.comment,`
COMMENT ON COLUMN "${l}"."${t}" is '${o}';`).if(t!=r,`
ALTER TABLE "${l}" RENAME COLUMN "${t}" TO "${r}";`).toString()}showUsers(){return'SELECT username "user" FROM all_users'}pingDataBase(e){return e?`set SCHEMA ${e}`:"select 1"}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:o}=e;let s="";return o&&o!=r&&(s=`COMMENT ON TABLE "${t}" IS '${o}';`),n&&t!=n&&(s+=`ALTER TABLE "${t}" RENAME TO "${n}"`),s}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE \`',table_schema,'\`.\`',TABLE_NAME, '\`;') trun FROM INFORMATION_SCHEMA.TABLES where  table_schema ='${e}' and TABLE_TYPE<>'VIEW';`}createDatabase(e){return"CREATE USER [name] IDENTIFIED BY [password];"}showTableSource(e,t){return`CALL SP_TABLEDEF('${e}', '${t}');`}showViewSource(e,t){return`CALL SP_VIEWDEF('${e}', '${t}');`}showProcedureSource(e,t){return`SELECT LISTAGG(text) within group(order by line) "Create Procedure"
        FROM all_source
       WHERE owner = '${e}'
         AND name  = '${t}'
       ORDER BY line`}showFunctionSource(e,t){return`select DBMS_METADATA.GET_DDL('FUNCTION', '${t}','${e}') "Create Function";`}showTriggerSource(e,t){return`SHOW CREATE TRIGGER \`${e}\`.\`${t}\`;`}showColumns(e,t){return`select
        a.COLUMN_NAME "name",
        a.DATA_DEFAULT "defaultValue",
        a.DATA_TYPE "simpleType",
        CONCAT(a.DATA_TYPE,'(',a.data_length,')') "type",
        a.data_length "maxLength",
        a.NULLABLE "nullable",
        c.CONSTRAINT_TYPE "key",
        cc.COMMENTS "comment"
      from
        all_tab_columns a
        left join all_col_comments cc on a.COLUMN_NAME=cc.COLUMN_NAME and a.OWNER=cc.SCHEMA_NAME and a.table_name=cc.table_name
        left join ALL_CONS_COLUMNS b on a.COLUMN_NAME=b.COLUMN_NAME and a.OWNER=b.OWNER and a.table_name=b.table_name
        left join DBA_CONSTRAINTS c on b.CONSTRAINT_NAME=c.CONSTRAINT_NAME
      where
        a.owner = '${e}'
        and a.table_name = '${t}';`}showTriggers(e,t){const n=t?` AND TABLE_NAME='${t}'`:"";return`SELECT * FROM all_triggers WHERE TABLE_OWNER='${e}' ${n} ORDER BY TRIGGER_NAME`}showProcedures(e){return`select object_name "ROUTINE_NAME" from all_objects where object_type = 'PROCEDURE' and owner='${e}' ORDER BY "ROUTINE_NAME";`}showFunctions(e){return`select object_name "ROUTINE_NAME" from all_objects where object_type = 'FUNCTION' and owner='${e}' ORDER BY "ROUTINE_NAME";`}showViews(e){return`select object_name "name" from all_objects where object_type = 'VIEW' and owner='${e}';`}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n};`}countSql(e,t){return`SELECT count(*) FROM ${t};`}showTables(e,t){return`SELECT a.object_name "name",b.COMMENTS "comment" from all_objects a
join ALL_TAB_COMMENTS b on a.OWNER=b.OWNER and a.object_name=b.TABLE_NAME
where a.object_type = 'TABLE' and a.owner='${t}' and a.TEMPORARY<>'Y';`}showDatabases(){return`select object_name "Database" from all_objects where object_type = 'SCH';`}showSchemas(){return`select object_name "Database" from all_objects where object_type = 'SCH';`}tableTemplate(){return`CREATE TABLE table_name$1(  
    id int NOT NULL PRIMARY KEY IDENTITY(1,1),
    create_time DATETIME,
    name$2 VARCHAR(255)
);
COMMENT ON TABLE $1 IS '$3';
COMMENT ON COLUMN $1.$2 IS '$4';`}viewTemplate(){return`CREATE VIEW view_name$1
AS
SELECT * FROM $2`}procedureTemplate(){return`CREATE PROCEDURE proc_name$1(x IN OUT NUMBER, y OUT NUMBER)
IS
BEGIN
   $2
   y:=4 * x;
END;`}triggerTemplate(){return`CREATE TRIGGER trigger_name$1
[BEFORE/AFTER] [INSERT/UPDATE/DELETE]
ON [table]
FOR EACH ROW BEGIN

END;`}functionTemplate(){return`CREATE FUNCTION fun_name$1(x IN int) RETURN int$2
AS
BEGIN
    $3
    return x*2;
END;`}}class P extends N{showVersion(){return"select @@version server_version;"}createIndex(e){let t=`${e.type||"key"}`;return t.match(/BTREE/i)&&(t="key"),`ALTER TABLE ${e.table} ADD ${t} (\`${e.column||"$1"}\`)`}dropIndex(e,t){return`ALTER TABLE ${e} DROP INDEX \`${t}\``}showIndex(e,t){return`SELECT column_name "column_name",index_name "index_name",index_type "index_type",non_unique=0 "isUnique" FROM INFORMATION_SCHEMA.STATISTICS WHERE table_schema='${e}' and table_name='${t}';`}variableList(){return"show global VARIABLES"}statusList(){return"show global status"}processList(){return"show processlist"}addColumn(e,t){const n=t?` AFTER \`${t}\``:"";return`ALTER TABLE ${e} 
    ADD COLUMN $1 [type]$2 COMMENT '$3'${n};`}createUser(){return`CREATE USER '$1'@'%' IDENTIFIED BY 'password$2';
-- Grant select privilege to all databases;
GRANT SELECT ON *.* TO '$1'@'%' WITH GRANT OPTION;
-- Grant all privileges to all databases;
GRANT ALL PRIVILEGES ON *.* TO '$1'@'%' WITH GRANT OPTION;`}updateUser(e){return`update mysql.user set 
    password = PASSWORD("newPassword")
    where User = '${e}';
FLUSH PRIVILEGES;
-- since mysql version 5.7, password column need change to authentication_string=PASSWORD("newPassword")`}updateColumn(e,t){var o,s;const{nullable:n,extra:r}=t;return this.updateColumnSql({table:e,...t,isNotNull:n!="YES",isAutoIncrement:(s=(o=r==null?void 0:r.toLowerCase())==null?void 0:o.includes)==null?void 0:s.call(o,"auto_increment")})}updateColumnSql(e){const{table:t,name:n,columnName:r=n,type:o,unsigned:s,zerofill:l,isNotNull:i,isAutoIncrement:E,comment:m,defaultValue:u,character_set_name:L,collation_name:U}=e,v=j(o);return new d(`ALTER TABLE \`${t}\``).append(`
	CHANGE \`${r}\` \`${n}\` ${o}`).if(s=="1","UNSIGNED").if(l=="1","ZEROFILL").if(!v&&L,`CHARACTER SET ${L}`).if(!v&&U,`COLLATE ${U}`).if(i,"NOT NULL").if(E,"AUTO_INCREMENT").if(m,`COMMENT '${m}'`).if(_(u)&&!i,"DEFAULT NULL").if(!_(u),`DEFAULT ${u=="CURRENT_TIMESTAMP"?u:`${A(u,o)}`}`).append(";").toString()}showCollations(){return'select DEFAULT_COLLATE_NAME "name",CHARACTER_SET_NAME "charset",DESCRIPTION "description" from information_schema.CHARACTER_SETS ORDER BY name;'}showChecks(e,t){return`SELECT
        tc.CONSTRAINT_NAME "name",
        cc.CHECK_CLAUSE "clause"
    FROM
        information_schema.CHECK_CONSTRAINTS AS cc,
        information_schema.TABLE_CONSTRAINTS AS tc
    WHERE
        tc.CONSTRAINT_SCHEMA = '${e}'
        AND tc.TABLE_NAME = '${t}'
        AND tc.CONSTRAINT_TYPE = 'CHECK'
        AND tc.CONSTRAINT_SCHEMA = cc.CONSTRAINT_SCHEMA
        AND tc.CONSTRAINT_NAME = cc.CONSTRAINT_NAME;`}showUsers(){return"SELECT user user,host host FROM mysql.user;"}pingDataBase(e){return e?`use \`${e}\``:"select 1"}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:o,collation:s,newCollation:l}=e;let i="";return o&&o!=r&&(i=`ALTER TABLE \`${t}\` COMMENT = '${o}';`),l&&l!=s&&(i+=`ALTER TABLE \`${t}\` collate = '${l}';`),n&&t!=n&&(i+=`ALTER TABLE \`${t}\` RENAME TO \`${n}\`;`),i}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE \`',table_schema,'\`.\`',TABLE_NAME, '\`;') trun FROM INFORMATION_SCHEMA.TABLES where  table_schema ='${e}' and TABLE_TYPE<>'VIEW';`}createDatabase(e){return`CREATE DATABASE $1
    DEFAULT CHARACTER SET = 'utf8mb4';`}showTableSource(e,t){return`SHOW CREATE TABLE \`${e}\`.\`${t}\`;`}showPartitions(e,t){return`SELECT 
PARTITION_NAME "name",PARTITION_METHOD "strategy",PARTITION_EXPRESSION "columnName",
PARTITION_DESCRIPTION "value",TABLE_ROWS "rows",DATA_LENGTH "length"
        FROM information_schema.partitions WHERE TABLE_SCHEMA='${e}' AND TABLE_NAME = '${t}' AND PARTITION_NAME IS NOT NULL`}showViewSource(e,t){return`SHOW CREATE VIEW  \`${e}\`.\`${t}\`;`}showProcedureSource(e,t){return`SHOW CREATE PROCEDURE \`${e}\`.\`${t}\`;`}showFunctionSource(e,t){return`SHOW CREATE FUNCTION \`${e}\`.\`${t}\`;`}showTriggerSource(e,t){return`SHOW CREATE TRIGGER \`${e}\`.\`${t}\`;`}showColumns(e,t,n){return`SELECT 
        c.COLUMN_NAME name,
        COLUMN_TYPE columnType,
        DATA_TYPE simpleType,
        if(CHARACTER_MAXIMUM_LENGTH,CONCAT(DATA_TYPE,'(',CHARACTER_MAXIMUM_LENGTH,')'), DATA_TYPE) type,
        COLUMN_COMMENT comment,COLUMN_KEY \`key\`,IS_NULLABLE nullable,
        CHARACTER_MAXIMUM_LENGTH maxLength,
        COLUMN_DEFAULT defaultValue,
        INSTR(COLUMN_TYPE,'zerofill')>0 "zerofill",
        INSTR(COLUMN_TYPE,'unsigned')>0 "unsigned",
        EXTRA extra,
        COLLATION_NAME collation_name,
        CHARACTER_SET_NAME character_set_name 
        ${n?",ik.REFERENCED_TABLE_NAME referenced_table_name, ik.REFERENCED_COLUMN_NAME referenced_column_name":""}

        FROM information_schema.columns c
        ${n?"LEFT JOIN information_schema.KEY_COLUMN_USAGE ik on c.table_schema = ik.TABLE_SCHEMA and c.table_name = ik.TABLE_NAME and c.COLUMN_NAME=ik.COLUMN_NAME":""}

        WHERE c.table_schema = '${e}' AND c.table_name = '${t}' 
        ORDER BY c.ORDINAL_POSITION;`}showTriggers(e,t){const n=t?` AND EVENT_OBJECT_TABLE='${t}'`:"";return`SELECT TRIGGER_NAME FROM information_schema.TRIGGERS WHERE TRIGGER_SCHEMA = '${e}' ${n} ORDER BY TRIGGER_NAME;`}showProcedures(e){return`SELECT ROUTINE_NAME FROM information_schema.routines WHERE ROUTINE_SCHEMA = '${e}' and ROUTINE_TYPE='PROCEDURE' ORDER BY ROUTINE_NAME`}showFunctions(e){return`SELECT ROUTINE_NAME FROM information_schema.routines WHERE ROUTINE_SCHEMA = '${e}' and ROUTINE_TYPE='FUNCTION' ORDER BY ROUTINE_NAME`}showViews(e){return`SELECT TABLE_NAME name,SECURITY_TYPE "view_group" FROM information_schema.VIEWS  WHERE TABLE_SCHEMA = '${e}' ORDER BY TABLE_NAME`}buildPageSql(e,t,n,r=!1){return`SELECT * FROM ${r?e+".":""}${t} LIMIT ${n};`}countSql(e,t){return`SELECT count(*) FROM ${t};`}showTables(e){return`SELECT TABLE_COMMENT "comment",TABLE_NAME "name",TABLE_ROWS "table_rows",\`AUTO_INCREMENT\` "auto_increment",
        row_format "row_format",DATA_LENGTH "data_length",INDEX_LENGTH "index_length",TABLE_COLLATION "collation",
        TABLE_TYPE "view_group"
        FROM information_schema.TABLES  WHERE TABLE_SCHEMA = '${e}' and TABLE_TYPE<>'VIEW' ORDER BY TABLE_NAME;`}showDatabases(){return"show DATABASES"}showSchemas(){return this.showDatabases()}tableTemplate(){return`CREATE TABLE table_name$1(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME COMMENT 'Create Time',
    name$2 VARCHAR(255)
) COMMENT '$4';`}viewTemplate(){return`CREATE VIEW view_name$1
AS
SELECT * FROM $2`}procedureTemplate(){return`CREATE PROCEDURE proc_name$1()
BEGIN
$2
END;`}triggerTemplate(){return`CREATE TRIGGER $1
BEFORE INSERT ON table_name$2
FOR EACH ROW BEGIN
    $3
END;`}functionTemplate(){return`CREATE FUNCTION fun_name$1() RETURNS int$2
READS SQL DATA
BEGIN
    $3
    return 0;
END;`}}class ee extends P{showVersion(){return"select replace(@@version,'-MariaDB','') server_version;"}}class te extends N{showVersion(){return"show version"}showDatabases(){return"show dbs"}buildPageSql(e,t,n){return`db('${e}').collection('${t}').find({}).limit(${n}).toArray()`}pingDataBase(e){return null}dropIndex(e,t){throw new Error("Method not implemented.")}updateColumnSql(e){throw new Error("Method not implemented.")}showIndex(e,t){return`db('${e}').collection('${t}').indexes();`}createIndex(e){const{database:t,table:n,column:r}=e;return`db('${t}').collection('${n}').createIndex({ ${r||"column_name"}: 1 });`}createDatabase(e){return'db("db_name").createCollection("collection")'}showSchemas(){throw new Error("Method not implemented.")}updateTable(e){throw new Error("Method not implemented.")}updateColumn(e,t){throw new Error("Method not implemented.")}showTables(e){throw new Error("Method not implemented.")}addColumn(e,t){throw new Error("Method not implemented.")}showColumns(e,t){throw new Error("Method not implemented.")}showViews(e){throw new Error("Method not implemented.")}showSystemViews(e){throw new Error("Method not implemented.")}showUsers(){throw new Error("Method not implemented.")}createUser(){throw new Error("Method not implemented.")}showTriggers(e){throw new Error("Method not implemented.")}showProcedures(e){throw new Error("Method not implemented.")}showFunctions(e){throw new Error("Method not implemented.")}countSql(e,t){throw new Error("Method not implemented.")}truncateDatabase(e){throw new Error("Method not implemented.")}renameTable(e,t,n){throw new Error("Method not implemented.")}showTableSource(e,t){throw new Error("Method not implemented.")}showViewSource(e,t){throw new Error("Method not implemented.")}showProcedureSource(e,t){throw new Error("Method not implemented.")}showFunctionSource(e,t){throw new Error("Method not implemented.")}showTriggerSource(e,t){throw new Error("Method not implemented.")}tableTemplate(){throw new Error("Method not implemented.")}viewTemplate(){throw new Error("Method not implemented.")}procedureTemplate(){throw new Error("Method not implemented.")}triggerTemplate(){throw new Error("Method not implemented.")}functionTemplate(){throw new Error("Method not implemented.")}processList(){throw new Error("Method not implemented.")}variableList(){throw new Error("Method not implemented.")}statusList(){throw new Error("Method not implemented.")}dropTriggerTemplate(e){throw new Error("Method not implemented.")}}class ne extends N{showVersion(){return"SELECT CAST(SERVERPROPERTY('ProductVersion') AS SYSNAME)+' '+CAST(SERVERPROPERTY('Edition') AS SYSNAME) AS server_version"}createIndex(e){return`ALTER TABLE ${e.table} ADD ${e.type} (${e.column})`}dropIndex(e,t){return`DROP INDEX ${e}.${t}`}showIndex(e,t){return`SELECT
        index_name = ind.name,
        column_name = col.name,
        ind.is_primary_key "isPrimary",
        ind.is_unique "isUnique",
        ind.is_unique_constraint,
        CASE 
            WHEN ind.is_primary_key=1 THEN 'PRIMARY'
            WHEN ind.is_unique=1 THEN 'UNIQUE'
            WHEN ind.is_unique_constraint=1 THEN 'UNIQUE'
        ELSE 'INDEX' END index_type
      FROM
        sys.indexes ind
        INNER JOIN sys.index_columns ic ON ind.object_id = ic.object_id
        and ind.index_id = ic.index_id
        INNER JOIN sys.columns col ON ic.object_id = col.object_id
        and ic.column_id = col.column_id
        INNER JOIN sys.tables t ON ind.object_id = t.object_id
      WHERE
        t.name = '${t}';`}variableList(){throw new Error("Method not implemented.")}statusList(){throw new Error("Method not implemented.")}processList(){return"sp_who"}addColumn(e,t){return`ALTER TABLE ${e} 
    ADD $1 [type]$2;`}createUser(){return"CREATE LOGIN [name] WITH PASSWORD = 'password';"}updateColumn(e,t){const{name:n,type:r,comment:o,nullable:s,defaultValue:l}=t,i=s=="YES"?"NULL":"NOT NULL";return`-- change column type
ALTER TABLE ${e} 
    ALTER COLUMN ${n} ${r} ${i};
-- change column name
EXEC sp_rename '${e}.${n}', '${n}', 'COLUMN';`}updateColumnSql(e){const{columnName:t,columnType:n,newColumnName:r,comment:o,isNotNull:s,table:l}=e,i=s?"NOT NULL":"NULL";return new d(`ALTER TABLE ${l} ALTER COLUMN ${t} ${n} ${i};`,`
`).if(t!=r,()=>`EXEC sp_rename '${l}.${t}' , '${r}', 'COLUMN';`).toString()}showUsers(){return"SELECT name [user] from sys.database_principals where type='S'"}updateTable(e){const{database:t,table:n,newTableName:r}=e;return`sp_rename '${n}', '${r}'`}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE [',table_schema,'].[',TABLE_NAME, '];') trun FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'  AND TABLE_SCHEMA='${e}'`}createDatabase(e){return`create database ${e||"[name]"}`}showTableSource(e,t){return""}showViewSource(e,t){return`SELECT definition 'Create View' FROM sys.sql_modules WHERE object_id = OBJECT_ID('${e}.${t}');`}showProcedureSource(e,t){return`SELECT definition 'Create Procedure','${e}.${t}' "Procedure" FROM sys.sql_modules WHERE object_id = OBJECT_ID('${e}.${t}');`}showFunctionSource(e,t){return`SELECT definition 'Create Function','${e}.${t}' "Function" FROM sys.sql_modules WHERE object_id = OBJECT_ID('${e}.${t}');`}showTriggerSource(e,t){return`SELECT definition 'SQL Original Statement','${e}.${t}' "Trigger" FROM sys.sql_modules WHERE object_id = OBJECT_ID('${e}.${t}');`}showColumns(e,t){return["information_schema","sys"].includes(e==null?void 0:e.toLowerCase())?`SELECT
            name,
            type_name(system_type_id) "simpleType",
            concat(type_name(system_type_id) , '(' , max_length ,')') "type",
            is_nullable nullable,
            max_length "maxLength"
        FROM
            sys.all_columns
        WHERE
            object_id = OBJECT_ID('${e}.${t}') ;`:`SELECT c.COLUMN_NAME "name", DATA_TYPE "simpleType", 
        CASE
        WHEN CHARACTER_MAXIMUM_LENGTH IS NOT NULL
            THEN (DATA_TYPE + '(' + CONVERT(NVARCHAR, CHARACTER_MAXIMUM_LENGTH) + ')')
        ELSE
            DATA_TYPE
        END AS "type",
        IS_NULLABLE nullable, CHARACTER_MAXIMUM_LENGTH "maxLength", COLUMN_DEFAULT "defaultValue", '' "comment", tc.constraint_type "key",
        COLUMNPROPERTY(object_id('${e}.${t}'), c.COLUMN_NAME, 'IsIdentity') is_identity
        FROM
        INFORMATION_SCHEMA.COLUMNS c
        left join  INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE ccu
        on c.COLUMN_NAME=ccu.column_name and c.table_name=ccu.table_name and ccu.TABLE_SCHEMA=c.TABLE_SCHEMA
        left join  INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
        on tc.constraint_name=ccu.constraint_name
        and tc.TABLE_SCHEMA=c.TABLE_SCHEMA and tc.table_name=c.table_name WHERE c.TABLE_SCHEMA = '${e}' AND c.table_name = '${t}' ORDER BY ORDINAL_POSITION`}showChecks(e,t){return`SELECT
        tc.CONSTRAINT_NAME "name",
        cc.CHECK_CLAUSE "clause"
    FROM
        "INFORMATION_SCHEMA"."CHECK_CONSTRAINTS" AS cc,
        "INFORMATION_SCHEMA"."TABLE_CONSTRAINTS" AS tc
    WHERE
        tc.CONSTRAINT_SCHEMA = '${e}'
        AND tc.TABLE_NAME = '${t}'
        AND tc.CONSTRAINT_TYPE = 'CHECK'
        AND tc.CONSTRAINT_SCHEMA = cc.CONSTRAINT_SCHEMA
        AND tc.CONSTRAINT_NAME = cc.CONSTRAINT_NAME;`}showForeignKeys(e,t){return`SELECT
        f.name AS "constraint_name",
        COL_NAME( fkc.parent_object_id, fkc.parent_column_id ) AS "column_name",
        OBJECT_NAME (fkc.referenced_object_id) AS "referenced_table",
        COL_NAME( fkc.referenced_object_id, fkc.referenced_column_id )  AS "referenced_column",
        update_referential_action_desc "updateRule",
        delete_referential_action_desc "deleteRule"
    FROM
        sys.foreign_key_columns fkc
        JOIN sys.foreign_keys f ON f.object_id = fkc.constraint_object_id
        JOIN sys.tables tab1 ON tab1.object_id = fkc.parent_object_id and tab1.name='${t}' and SCHEMA_NAME(tab1.schema_id)='${e}'
    ;`}showTriggers(e){return`SELECT t.name TRIGGER_NAME FROM SYS.OBJECTS t INNER JOIN sys.schemas s ON t.schema_id = s.schema_id WHERE TYPE = 'TR' and s.name='${e}'`}showProcedures(e){return`SELECT ROUTINE_NAME FROM INFORMATION_SCHEMA.ROUTINES WHERE SPECIFIC_SCHEMA = '${e}' and ROUTINE_TYPE='PROCEDURE' ORDER BY ROUTINE_NAME`}showFunctions(e){return`SELECT ROUTINE_NAME FROM INFORMATION_SCHEMA.ROUTINES WHERE SPECIFIC_SCHEMA = '${e}' and ROUTINE_TYPE='FUNCTION' ORDER BY ROUTINE_NAME`}showViews(e,t){return`SELECT name FROM sys.all_views t where SCHEMA_NAME(t.schema_id)='${t}' order by name`}buildPageSql(e,t,n){return`SELECT TOP ${n} * FROM ${e}.${t};`}countSql(e,t){return`SELECT count(*) count FROM ${e}.${t};`}showTables(e,t){return`SELECT TABLE_NAME 'name'
      FROM
        INFORMATION_SCHEMA.TABLES t
      WHERE
        TABLE_TYPE = 'BASE TABLE'
        AND TABLE_SCHEMA = '${t}' order by TABLE_NAME`}showDatabases(){return"SELECT name 'Database' FROM sys.databases"}showSchemas(){return"SELECT SCHEMA_NAME [schema] FROM INFORMATION_SCHEMA.SCHEMATA"}tableTemplate(){return`CREATE TABLE table_name$1(  
    id int IDENTITY(1,1) primary key,
    create_time DATETIME,
    update_time DATETIME,
    content$2 varchar(255)
);
EXECUTE sp_addextendedproperty N'MS_Description', '[table_comment]', N'user', N'dbo', N'table', N'[table_name]', NULL, NULL;
EXECUTE sp_addextendedproperty N'MS_Description', '[column_comment]', N'user', N'dbo', N'table', N'[table_name]', N'column', N'[column_name]';
`}viewTemplate(){return`CREATE VIEW dbo.view_name$1
AS
SELECT * FROM 
GO`}procedureTemplate(){return`CREATE PROCEDURE dbo.procedure_name$1
AS
BEGIN
    $2
END;`}triggerTemplate(){return`CREATE TRIGGER dbo.trigger_name
ON [table]
[INSTEAD OF/AFTER] [INSERT/UPDATE/DELETE]
AS
BEGIN

END;`}functionTemplate(){return`CREATE FUNCTION dbo.function_name$1() RETURNS [TYPE]
BEGIN
    $2
    return [value];
END;`}}class ae extends N{showVersion(){return"call dbms.components() yield name, versions, edition unwind versions as server_version return server_version;"}updateColumn(e,t){throw new Error("Method not implemented.")}showDatabases(){return"SHOW DATABASES yield name AS Database"}showSchemas(){return this.showDatabases()}showTables(e){return"call db.labels() yield label as name RETURN name ORDER BY toLower(name)"}addColumn(e,t){return`MATCH (n:${e}) WHERE id(n) = 1 SET n.name = 'name' RETURN n`}showColumns(e,t){return`MATCH(n:\`${t}\`) UNWIND keys(n) AS name RETURN DISTINCT name`}showIndex(e,t){return`show indexes yield name as index_name, properties as column_name, type as index_type, labelsOrTypes where '${t}' in labelsOrTypes`}showViews(e){return"call db.relationshipTypes() yield relationshipType AS name RETURN name ORDER BY toLower(name)"}showUsers(){return"SHOW USERS"}createUser(){return`CREATE USER [name] IF NOT EXISTS 
    SET PASSWORD 'password';`}showTriggers(e){throw new Error("Method not implemented.")}showProcedures(e){throw new Error("Method not implemented.")}showFunctions(e){throw new Error("Method not implemented.")}buildPageSql(e,t,n){return`MATCH (n${t=="*"?"":`:${t}`}) RETURN n LIMIT ${n}`}countSql(e,t){return`MATCH (m:${t}) RETURN count(m) as count`}createDatabase(e){return"CREATE DATABASE $1"}truncateDatabase(e){throw new Error("Method not implemented.")}updateTable(e){throw new Error("Method not implemented.")}showTableSource(e,t){throw new Error("Method not implemented.")}showViewSource(e,t){throw new Error("Method not implemented.")}showProcedureSource(e,t){throw new Error("Method not implemented.")}showFunctionSource(e,t){throw new Error("Method not implemented.")}showTriggerSource(e,t){throw new Error("Method not implemented.")}tableTemplate(){return"CREATE (n:node {id:1}) return n;"}createIndex(e){return`CREATE INDEX FOR (n:${e.table}) ON (n.id)`}dropIndex(e,t){return`DROP INDEX \`${t}\``}viewTemplate(){return"MATCH (n1:node {id:1}), (n2:node {id:2}) CREATE (n1)-[r:TO]->(n2) RETURN type(r)"}procedureTemplate(){throw new Error("Method not implemented.")}triggerTemplate(){throw new Error("Method not implemented.")}functionTemplate(){throw new Error("Method not implemented.")}processList(){throw new Error("Method not implemented.")}variableList(){throw new Error("Method not implemented.")}statusList(){throw new Error("Method not implemented.")}}class k{constructor(e){this.param=e,this.afterTablePrefix=`ALTER TABLE "${e.table}"`,this.afterColumnPrefix=`${this.afterTablePrefix} ALTER COLUMN "${e.columnName}"`}genAlterSQL(){const{columnName:e,newColumnName:t}=this.param;return new d("",`
`).append(this.changeTypePart()).append(this.notNullPart()).append(this.defaultPart()).append(this.commentPart()).if(e!=t,`${this.afterTablePrefix} RENAME COLUMN "${e}" TO "${t}";`).toString()}changeTypePart(){const{oldRow:e,columnType:t}=this.param;return e.type==t?"":`${this.afterColumnPrefix} TYPE ${t};`}notNullPart(){const{oldRow:e,isNotNull:t}=this.param;return e.isNotNull==t?"":`${this.afterColumnPrefix} ${t?"SET NOT NULL":"DROP NOT NULL"};`}defaultPart(){const{oldRow:e,defaultValue:t,columnType:n}=this.param;return e.defaultValue==t?"":`${this.afterColumnPrefix} ${_(t)?"DROP DEFAULT":`SET DEFAULT ${A(t,n)}`};`}commentPart(){return""}}class G extends k{defaultPart(){var m,u;const{oldRow:e,isAutoIncrement:t,defaultValue:n,columnType:r}=this.param,o=(m=n==null?void 0:n.match)==null?void 0:m.call(n,/\bnextval\b/);if(t&&!e.isAutoIncrement&&!o)return`${this.afterColumnPrefix} ADD GENERATED ALWAYS AS IDENTITY;`;if(!t&&e.isAutoIncrement&&!o)return`${this.afterColumnPrefix} DROP IDENTITY;`;if(!t&&e.isAutoIncrement&&o)return`${this.afterColumnPrefix} DROP DEFAULT;`;if(e.defaultValue==n)return"";const E=(u=n==null?void 0:n.match)!=null&&u.call(n,/\bnextval\b/)?n:A(n,r);return`${this.afterColumnPrefix} ${_(n)?"DROP DEFAULT":`SET DEFAULT ${E}`};`}commentPart(){const{oldRow:e,table:t,columnName:n,comment:r}=this.param;if(r!=e.comment)return`COMMENT ON COLUMN "${t}"."${n}" is '${r}';`}}class W extends N{showVersion(){return"SHOW server_version;"}createIndex(e){const t=e.name??`${e.column||"[column]"}`,n=e.indexType||"btree";return`CREATE INDEX ${t}_${new Date().getTime()}_index ON 
    ${e.table} USING ${n} ("${e.column||"[column]"}");`}dropIndex(e,t){return`DROP INDEX "${t}"`}showIndex(e,t){return`select
    t.relname as table_name,
    i.relname as index_name,
    a.attname as column_name,
    ix.indisprimary "isPrimary",
    ix.indisunique "isUnique",
    CASE ix.indisprimary
        WHEN true THEN 'PRIMARY'
    ELSE CASE ix.indisunique
        WHEN true THEN 'UNIQUE'
    ELSE 'KEY'
    END
    END AS index_type,
    am.amname index_method
  from
    pg_class t
    join pg_catalog.pg_namespace pgn ON pgn.oid=t.relnamespace and pgn.nspname='${e}'
    join pg_index ix on t.oid = ix.indrelid
    join pg_attribute a on t.oid = a.attrelid and a.attnum = ANY(ix.indkey)
    join pg_class i on ix.indexrelid = i.oid
    JOIN pg_am am ON am.oid=i.relam
  where
     t.relkind = 'r'
    and t.relname = '${t}'
  order by
    ix.indexrelid;`}variableList(){return"SHOW ALL"}statusList(){return`SELECT
        'db_numbackends' AS db,
        pg_stat_get_db_numbackends(datid) AS status
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_xact_commit',
        pg_stat_get_db_xact_commit(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_xact_rollback',
        pg_stat_get_db_xact_rollback(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_blocks_fetched',
        pg_stat_get_db_blocks_fetched(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_blocks_hit',
        pg_stat_get_db_blocks_hit(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()`}processList(){return`SELECT
        a.pid AS "Id",
        a.usename AS "User",
        a.client_addr AS "Host",
        a.client_port AS "Port",
        datname AS "db",
        query AS "Command",
        l.mode AS "State",
        query_start AS "Time",
        CASE
          WHEN c.relname IS NOT NULL THEN 'Locked Object: ' || c.relname
          ELSE 'Locked Transaction: ' || l.virtualtransaction
        END AS "Info"
      FROM
        pg_stat_activity a
        LEFT JOIN pg_locks l ON a.pid = l.pid
        LEFT JOIN pg_class c ON l.relation = c.oid
      ORDER BY
        a.pid ASC,
        c.relname ASC`}addColumn(e,t){return`ALTER TABLE ${e} 
  ADD COLUMN [column] [type];
COMMENT ON COLUMN ${e}.[column] IS 'comment';`}createUser(){return`CREATE USER $1 WITH PASSWORD 'password$2';
-- Grant select privilege;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO $1;
-- Grant all privileges;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $1;`}updateUser(e){return`ALTER USER ${e} WITH PASSWORD 'new_password';`}updateColumn(e,t){const{name:n,type:r,comment:o,nullable:s,defaultValue:l}=t;return`-- change column type
ALTER TABLE ${e} 
    ALTER COLUMN ${n} TYPE ${r};
-- change column name
ALTER TABLE ${e} 
    RENAME COLUMN ${n} TO ${n};
-- Change column comment
COMMENT ON COLUMN ${e}.${n} IS '${o||"comment"}';`}updateColumnSql(e){return new G(e).genAlterSQL()}showUsers(){return'SELECT usename "user" from pg_user '}pingDataBase(e){return e?`set schema '${e}';`:"select 1"}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:o}=e;let s="";return o&&o!=r&&(s=`COMMENT ON TABLE "${t}" IS '${o}';`),n&&t!=n&&(s+=`ALTER TABLE "${t}" RENAME TO "${n}";`),s}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE "',TABLE_NAME, '";') trun FROM INFORMATION_SCHEMA.TABLES WHERE  table_schema ='${e}' AND table_type='BASE TABLE';`}createDatabase(e){return"CREATE DATABASE $1"}showTableSource(e,t){return""}showViewSource(e,t){return`SELECT CONCAT('CREATE VIEW ',table_name,'
AS
(',regexp_replace(view_definition,';$',''),')') "Create View",table_name,view_definition from information_schema.views where table_schema='${e}' and table_name='${t}'
        UNION ALL
        SELECT CONCAT('CREATE MATERIALIZED VIEW ',matviewname,'
AS
(',regexp_replace(definition,';$',''),')') "Create View",matviewname "table_name",'definition' "view_definition" from pg_matviews
        WHERE schemaname='${e}';`}showProcedureSource(e,t){return`select pg_get_functiondef('${e}.${t}' :: regproc) "Create Procedure",'${t}' "Procedure";`}showTriggerSource(e,t){return`select pg_get_triggerdef(oid) "SQL Original Statement",'${e}.${t}' "Trigger" from pg_trigger where tgname = '${t}';`}showColumns(e,t){return`SELECT c.COLUMN_NAME "name", 
          DATA_TYPE "simpleType", 
          case when (CHARACTER_MAXIMUM_LENGTH is not null) then DATA_TYPE || '(' || CHARACTER_MAXIMUM_LENGTH || ')' else DATA_TYPE end "type",
          IS_NULLABLE nullable, 
          CHARACTER_MAXIMUM_LENGTH "maxLength", 
          COLUMN_DEFAULT "defaultValue", 
          pg_catalog.col_description(pgc.oid, c.ordinal_position::int) AS "comment",
          tc.constraint_type "key",
          tc.constraint_name "constraint_name",
          cc.table_name "to_table",
          cc.column_name "to_column",
          pa.*
        FROM information_schema.columns c
        JOIN pg_catalog.pg_class pgc ON c.table_name = pgc.relname 
        JOIN pg_catalog.pg_namespace pgn ON pgn.oid=pgc.relnamespace and pgn.nspname=c.table_schema
        JOIN pg_attribute pa on pa.attname =c.column_name and pa.attrelid =pgc.oid 
        LEFT JOIN information_schema.key_column_usage ccu on c.COLUMN_NAME=ccu.column_name and c.table_name=ccu.table_name 
          and ccu.table_catalog=c.TABLE_CATALOG and c.table_schema=ccu.table_schema
        LEFT JOIN information_schema.table_constraints tc on tc.constraint_name=ccu.constraint_name and tc.table_schema=ccu.table_schema 
          and tc.table_catalog=c.TABLE_CATALOG and tc.table_name=c.table_name 
        LEFT JOIN information_schema.constraint_column_usage cc on cc.table_catalog=c.TABLE_CATALOG and  cc.constraint_name=tc.constraint_name and cc.table_schema=c.table_schema 
          and tc.constraint_type='FOREIGN KEY'
        WHERE c.TABLE_SCHEMA = '${e}' AND c.table_name = '${t}' 
        ORDER BY c.ORDINAL_POSITION;`}showChecks(e,t){return`SELECT
    tc.CONSTRAINT_NAME "name",
    cc.CHECK_CLAUSE "clause"
FROM
    "information_schema"."check_constraints" AS cc,
    "information_schema"."table_constraints" AS tc
WHERE
    tc.CONSTRAINT_SCHEMA = '${e}'
    AND tc.TABLE_NAME = '${t}'
    AND tc.CONSTRAINT_TYPE = 'CHECK'
    AND tc.CONSTRAINT_SCHEMA = cc.CONSTRAINT_SCHEMA
    AND tc.CONSTRAINT_NAME = cc.CONSTRAINT_NAME
    AND cc.CONSTRAINT_NAME NOT LIKE '%_not_null'`}showPartitions(e,t){return`select col.column_name "columnName", pt.partition_strategy "strategy" from (
      select
          partrelid, partnatts, case partstrat when 'h' then 'HASH' when 'l' then 'LIST' when 'r' then 'RANGE' end as partition_strategy, unnest(partattrs) column_index
      from
          pg_partitioned_table ) pt
      join pg_class pc on pc.oid = pt.partrelid
      join information_schema.columns col on col.table_schema = pc.relnamespace :: regnamespace :: text
        and col.table_name = pc.relname and col.ordinal_position = pt.column_index
      WHERE col.table_schema='${e}' and col.table_name='${t}';`}showTriggers(e,t){const n=t?` AND event_object_table='${t}'`:"";return`SELECT TRIGGER_NAME "TRIGGER_NAME" FROM information_schema.TRIGGERS WHERE trigger_schema = '${e}' ${n} ORDER BY TRIGGER_NAME ASC`}showProcedures(e){return`SELECT ROUTINE_NAME "ROUTINE_NAME",pg_get_functiondef(p.oid) source,p.oid FROM information_schema.routines r
    join pg_proc p on r.ROUTINE_NAME=p.proname JOIN pg_namespace n ON p.pronamespace = n.oid and n.nspname='${e}'
    WHERE r.ROUTINE_SCHEMA = '${e}' and r.ROUTINE_TYPE='PROCEDURE' ORDER BY r.ROUTINE_NAME ASC`}showFunctions(e){return`SELECT r.ROUTINE_NAME "ROUTINE_NAME",
    p.oid FROM information_schema.routines r
    join pg_proc p on r.ROUTINE_NAME=p.proname JOIN pg_namespace n ON p.pronamespace = n.oid and n.nspname='${e}'
    WHERE r.ROUTINE_SCHEMA = '${e}' and r.ROUTINE_TYPE='FUNCTION' ORDER BY r.ROUTINE_NAME ASC `}showFunctionSource(e,t,n){return n?`select pg_get_functiondef('${n}') "Create Function",'${t}' "Function";`:`select pg_get_functiondef('${e}.${t}' :: regproc) "Create Function",'${t}' "Function";`}showViews(e,t){return`SELECT * FROM (SELECT table_name "name",'simple' "type" from information_schema.tables where table_schema='${t}' and table_type='VIEW' 
UNION ALL
SELECT matviewname "name",'material' "type" from pg_matviews
WHERE schemaname='${t}') v order by v."name" ASC`}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n};`}countSql(e,t){return`SELECT count(*) FROM ${t};`}showTables(e,t){return`SELECT t.table_name "name", pg_catalog.obj_description(pgc.oid, 'pg_class') "comment",pgc.reltuples "table_rows",pg_relation_size(pgc.oid) data_length
FROM information_schema.tables t
JOIN pg_catalog.pg_class pgc ON t.table_name = pgc.relname 
JOIN pg_catalog.pg_namespace pgn ON pgn.oid=pgc.relnamespace and pgn.nspname=t.table_schema
WHERE t.table_type='BASE TABLE'
AND t.table_schema='${t}' order by t.table_name;`}showDatabases(){return'SELECT datname "Database" FROM pg_database WHERE datistemplate = false order by datname ASC;'}showSchemas(){return'select schema_name "schema" from information_schema.schemata order by schema_name ASC;'}tableTemplate(e){return`CREATE TABLE table_name$1(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    create_time DATE,
    name$2 VARCHAR(255)
);
COMMENT ON TABLE table_name$1 IS '$3';
COMMENT ON COLUMN table_name$1.name$2 IS '$4';`}viewTemplate(){return`CREATE VIEW view_name$1
AS
SELECT * FROM $2`}procedureTemplate(){return`CREATE PROCEDURE proc_name$1()
LANGUAGE SQL
as $$
[$2]
$$;`}triggerTemplate(){return`CREATE FUNCTION trigger_fun$1() RETURNS TRIGGER AS 
$body$
BEGIN
    $2
    RETURN [value];
END;
$body$ 
LANGUAGE plpgsql;

CREATE TRIGGER [name]$3
[BEFORE/AFTER/INSTEAD OF] [INSERT/UPDATE/DELETE]
ON [table]
FOR EACH ROW
EXECUTE PROCEDURE [tri_fun]();`}dropTriggerTemplate(e){return`DROP TRIGGER ${e} on [table_name]`}functionTemplate(){return`CREATE FUNCTION fun_name$1() 
RETURNS int$2 AS $$
BEGIN
    $3
    return 0;
END;
$$ LANGUAGE plpgsql;`}}class re extends W{showVersion(){return"SELECT VERSION() as server_version"}createIndex(e){throw new Error("Redshift not support index!")}dropIndex(e,t){return`DROP INDEX "${t}"`}showIndex(e,t){return`select
    t.relname as table_name,
    i.relname as index_name,
    a.attname as column_name,
    ix.indisprimary "isPrimary",
    ix.indisunique "isUnique",
    CASE ix.indisprimary
        WHEN true THEN 'PRIMARY'
    ELSE CASE ix.indisunique
        WHEN true THEN 'UNIQUE'
    ELSE 'KEY'
    END
    END AS index_type
  from
    pg_class t
    join pg_catalog.pg_namespace pgn ON pgn.oid=t.relnamespace and pgn.nspname='${e}'
    join pg_index ix on t.oid = ix.indrelid
    join pg_attribute a on t.oid = a.attrelid and a.attnum = ANY(string_to_array(textin(int2vectorout(ix.indkey)),' ')::int[])
    join pg_class i on ix.indexrelid = i.oid
  where
     t.relkind = 'r'
    and t.relname = '${t}'
  order by
    ix.indisunique desc,i.relname;`}variableList(){return"SHOW ALL"}statusList(){return`SELECT
        'db_numbackends' AS db,
        pg_stat_get_db_numbackends(datid) AS status
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_xact_commit',
        pg_stat_get_db_xact_commit(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_xact_rollback',
        pg_stat_get_db_xact_rollback(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_blocks_fetched',
        pg_stat_get_db_blocks_fetched(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()
      UNION ALL
      SELECT
        'db_blocks_hit',
        pg_stat_get_db_blocks_hit(datid)
      FROM
        pg_stat_database
      WHERE
        datname = current_database()`}processList(){return`SELECT
        a.pid AS "Id",
        a.usename AS "User",
        a.client_addr AS "Host",
        a.client_port AS "Port",
        datname AS "db",
        query AS "Command",
        l.mode AS "State",
        query_start AS "Time",
        CASE
          WHEN c.relname IS NOT NULL THEN 'Locked Object: ' || c.relname
          ELSE 'Locked Transaction: ' || l.virtualtransaction
        END AS "Info"
      FROM
        pg_stat_activity a
        LEFT JOIN pg_locks l ON a.pid = l.pid
        LEFT JOIN pg_class c ON l.relation = c.oid
      ORDER BY
        a.pid ASC,
        c.relname ASC`}addColumn(e,t){return`ALTER TABLE ${e} 
  ADD COLUMN [column] [type];
COMMENT ON COLUMN ${e}.[column] IS 'comment';`}createUser(){return"CREATE USER [name] WITH PASSWORD 'password';"}updateUser(e){return`ALTER USER ${e} WITH PASSWORD 'new_password';`}updateColumn(e,t){const{name:n,type:r}=t;return`-- change column type
ALTER TABLE ${e} 
    ALTER COLUMN ${n} TYPE ${r};
-- change column name
ALTER TABLE ${e} 
    RENAME COLUMN ${n} TO ${n};`}updateColumnSql(e){return new G(e).genAlterSQL()}showUsers(){return'SELECT usename "user" from pg_user '}pingDataBase(e){return"select 1"}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:o}=e;let s="";return o&&o!=r&&(s=`COMMENT ON TABLE "${t}" IS '${o}';`),n&&t!=n&&(s+=`ALTER TABLE "${t}" RENAME TO "${n}";`),s}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE "',TABLE_NAME, '";') trun FROM INFORMATION_SCHEMA.TABLES WHERE  table_schema ='${e}' AND table_type='BASE TABLE';`}createDatabase(e){return"CREATE DATABASE $1"}showTableSource(e,t){return""}showViewSource(e,t){return`SELECT CONCAT('CREATE VIEW ',table_name,'
AS
(',regexp_replace(view_definition,';$',''),')') "Create View",table_name,view_definition from information_schema.views where table_schema='${e}' and table_name='${t}'
        UNION ALL
        SELECT CONCAT('CREATE MATERIALIZED VIEW ',matviewname,'
AS
(',regexp_replace(definition,';$',''),')') "Create View",matviewname "table_name",'definition' "view_definition" from pg_matviews
        WHERE schemaname='${e}';`}showProcedureSource(e,t){return`select pg_get_functiondef('${e}.${t}' :: regproc) "Create Procedure",'${t}' "Procedure";`}showFunctionSource(e,t){return`select pg_get_functiondef('${e}.${t}' :: regproc) "Create Function",'${t}' "Function";`}showTriggerSource(e,t){return`select pg_get_triggerdef(oid) "SQL Original Statement",'${e}.${t}' "Trigger" from pg_trigger where tgname = '${t}';`}showColumns(e,t){const n=t.split(".")[1];return`SELECT c.COLUMN_NAME "name", 
    DATA_TYPE "simple_type", 
    case when (CHARACTER_MAXIMUM_LENGTH is not null) then DATA_TYPE || '(' || CHARACTER_MAXIMUM_LENGTH || ')' else DATA_TYPE end "type",
    IS_NULLABLE nullable, 
    CHARACTER_MAXIMUM_LENGTH "maximum_length", 
    COLUMN_DEFAULT "default_value", 
    pg_catalog.col_description(pgc.oid, c.ordinal_position::int) AS "comment",
    tc.constraint_type "key"
  FROM information_schema.columns c
  JOIN pg_catalog.pg_class pgc ON c.table_name = pgc.relname 
  JOIN pg_catalog.pg_namespace pgn ON pgn.oid=pgc.relnamespace and pgn.nspname=c.table_schema
  left join  information_schema.constraint_column_usage ccu on c.COLUMN_NAME=ccu.column_name and c.table_name=ccu.table_name and ccu.table_catalog=c.TABLE_CATALOG and c.table_schema=ccu.table_schema
  left join  information_schema.table_constraints tc on tc.constraint_name=ccu.constraint_name and tc.table_schema=ccu.table_schema 
    and tc.table_catalog=c.TABLE_CATALOG and tc.table_name=c.table_name WHERE c.TABLE_SCHEMA = '${e}' AND c.table_name = '${n||t}' 
  ORDER BY ORDINAL_POSITION;`}showPartitions(e,t){return""}showTriggers(e,t){const n=t?` AND event_object_table='${t}'`:"";return`SELECT TRIGGER_NAME "TRIGGER_NAME" FROM information_schema.TRIGGERS WHERE trigger_schema = '${e}' ${n} ORDER BY TRIGGER_NAME ASC`}showProcedures(e){return`SELECT ROUTINE_NAME "ROUTINE_NAME" FROM information_schema.routines WHERE ROUTINE_SCHEMA = '${e}' and ROUTINE_TYPE='PROCEDURE' ORDER BY ROUTINE_NAME ASC`}showFunctions(e){return`SELECT ROUTINE_NAME "ROUTINE_NAME" FROM information_schema.routines WHERE ROUTINE_SCHEMA = '${e}' and ROUTINE_TYPE='FUNCTION' ORDER BY ROUTINE_NAME ASC `}showViews(e,t){return`SELECT * FROM (SELECT table_name "name",'simple' "type" from information_schema.tables where table_schema='${t}' and table_type='VIEW') v order by v."name" ASC`}buildPageSql(e,t,n){return new d("SELECT * FROM ","").append(e=="public"?t:`${e}.${t}`).append(` LIMIT ${n};`).toString()}showTables(e,t){return`  SELECT t.table_name "name", pg_catalog.obj_description(pgc.oid, 'pg_class') "comment"
FROM information_schema.tables t
JOIN pg_catalog.pg_class pgc ON t.table_name = pgc.relname 
JOIN pg_catalog.pg_namespace pgn ON pgn.oid=pgc.relnamespace and pgn.nspname=t.table_schema
WHERE t.table_type='BASE TABLE'
AND t.table_schema='${t}' order by t.table_name;`}showSchemas(){return'SELECT nspname "schema" from pg_catalog.pg_namespace order by nspname ASC;'}tableTemplate(e){return`CREATE TABLE ${(e=="public"?"":`${e}.`)+"table_name"}$1(  
    id INT identity(1, 1) NOT NULL PRIMARY KEY,
    create_time DATE,
    update_time DATE,
    content$2 VARCHAR(255)
);
COMMENT ON TABLE table_name IS 'table_comment';
COMMENT ON COLUMN table_name.content IS 'content';`}procedureTemplate(){return`CREATE PROCEDURE procedure_name()
as $$
begin
    SELECT 1;
END;
$$ LANGUAGE plpgsql;`}functionTemplate(){return`CREATE FUNCTION function_name() 
RETURNS int STABLE
AS $$
    SELECT 1
$$ LANGUAGE sql;`}}class oe extends N{showVersion(){return'select CURRENT_VERSION() as "server_version";'}createIndex(e){let t=`${e.type||"key"}`;return t.match(/BTREE/i)&&(t="key"),`ALTER TABLE ${e.table} ADD ${t} (\`${e.column||"$1"}\`)`}dropIndex(e,t){return`ALTER TABLE ${e} DROP INDEX \`${t}\``}showIndex(e,t){return""}variableList(){return"show global VARIABLES"}statusList(){return"show global status"}processList(){return"show processlist"}addColumn(e,t){const n=t?` AFTER \`${t}\``:"";return`ALTER TABLE ${e} 
    ADD COLUMN $1 [type]$2 COMMENT '$3'${n};`}createUser(){return`CREATE USER '$1'@'%' IDENTIFIED BY 'password$2';
-- Grant select privilege to all databases;
GRANT SELECT ON *.* TO '$1'@'%' WITH GRANT OPTION;
-- Grant all privileges to all databases;
GRANT ALL PRIVILEGES ON *.* TO '$1'@'%' WITH GRANT OPTION;`}updateUser(e){return`update mysql.user set 
    password = PASSWORD("newPassword")
    where User = '${e}';
FLUSH PRIVILEGES;
-- since mysql version 5.7, password column need change to authentication_string=PASSWORD("newPassword")`}updateColumn(e,t){var L;const{name:n,type:r,comment:o,nullable:s,defaultValue:l,extra:i,character_set_name:E,collation_name:m}=t,u=s!="YES";return new d(`ALTER TABLE ${e}`).append(`
	CHANGE ${n} ${n} ${r}`).if(E,`CHARACTER SET ${E}`).if(m,`COLLATE ${m}`).if(u,"NOT NULL").if((L=i==null?void 0:i.toLowerCase())==null?void 0:L.includes("auto_increment"),"AUTO_INCREMENT").if(o,`COMMENT '${o}'`).if(_(l)&&!u,"DEFAULT NULL").if(!_(l),`DEFAULT ${l=="CURRENT_TIMESTAMP"?l:`'${K(l)}'`}`).toString()}updateColumnSql(e){const{table:t,columnName:n,newColumnName:r,columnType:o,isNotNull:s,isAutoIncrement:l,comment:i,defaultValue:E,oldRow:m}=e,u=`ALTER TABLE "${t}"`,L=s?"SET NOT NULL":"DROP NOT NULL";return new d(`${u} ALTER COLUMN "${n}" TYPE ${o};`,`
`).if(i&&i!=m.comment,`${u} ALTER COLUMN "${n}" COMMENT '${i}';`).if(s!=m.isNotNull,`${u} ALTER COLUMN "${n}" ${L};`).if(n!=r,`${u} RENAME COLUMN "${n}" TO "${r}";`).toString()}showCollations(){return""}showChecks(e,t){return""}showUsers(){return"SELECT user user,host host FROM mysql.user;"}pingDataBase(e,t){return e?`use "${t}"."${e}"`:"select 1"}updateTable(e){const{table:t,newTableName:n,comment:r,newComment:o,collation:s,newCollation:l}=e;let i="";return o&&o!=r&&(i=`ALTER TABLE \`${t}\` COMMENT = '${o}';`),l&&l!=s&&(i+=`ALTER TABLE \`${t}\` collate = '${l}';`),n&&t!=n&&(i+=`ALTER TABLE \`${t}\` RENAME TO \`${n}\`;`),i}truncateDatabase(e){return`SELECT Concat('TRUNCATE TABLE \`',table_schema,'\`.\`',TABLE_NAME, '\`;') trun FROM INFORMATION_SCHEMA.TABLES where  table_schema ='${e}' and TABLE_TYPE<>'VIEW';`}createDatabase(e){return`CREATE DATABASE $1
    DEFAULT CHARACTER SET = 'utf8mb4';`}showTableSource(e,t){return`select get_ddl('table', '${e}.${t}') "Create Table";`}showViewSource(e,t){return`select get_ddl('view', '${e}.${t}') "Create View";`}showProcedureSource(e,t){return`select get_ddl('PROCEDURE', '${e}.${t}()') "Create Procedure";`}showFunctionSource(e,t){return`select get_ddl('FUNCTION', '${e}.${t}()') "Create Function";`}showTriggerSource(e,t){return`SHOW CREATE TRIGGER \`${e}\`.\`${t}\`;`}showColumns(e,t,n){return`SELECT 
        c.COLUMN_NAME "name",
        DATA_TYPE "simpleType",
        CASE
            WHEN CHARACTER_MAXIMUM_LENGTH IS NULL THEN DATA_TYPE
            ELSE CONCAT( DATA_TYPE, '(', CHARACTER_MAXIMUM_LENGTH, ')' )
        END "type",
        CHARACTER_MAXIMUM_LENGTH "maxLength",
        IS_IDENTITY "key",
        COMMENT "comment",
        IS_NULLABLE "nullable",
        COLUMN_DEFAULT "defaultValue",
        COLLATION_NAME "$"
        FROM information_schema.columns c
        WHERE c.table_schema = '${e}' AND c.table_name = '${t}' 
        ORDER BY c.ORDINAL_POSITION;`}showTriggers(e,t){const n=t?` AND EVENT_OBJECT_TABLE='${t}'`:"";return`SELECT TRIGGER_NAME FROM information_schema.TRIGGERS WHERE TRIGGER_SCHEMA = '${e}' ${n} ORDER BY TRIGGER_NAME;`}showProcedures(e){return`SELECT PROCEDURE_NAME ROUTINE_NAME FROM information_schema.PROCEDURES WHERE PROCEDURE_SCHEMA = '${e}' ORDER BY PROCEDURE_NAME`}showFunctions(e){return`SELECT FUNCTION_NAME ROUTINE_NAME FROM INFORMATION_SCHEMA.FUNCTIONS WHERE FUNCTION_SCHEMA='${e}' ORDER BY FUNCTION_NAME`}showViews(e,t){return`SELECT COMMENT "comment",TABLE_NAME "name",ROW_COUNT "table_rows"
        FROM information_schema.TABLES  WHERE TABLE_SCHEMA = '${t}' and TABLE_TYPE='VIEW' ORDER BY TABLE_NAME;`}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n};`}countSql(e,t){return`SELECT count(*) FROM ${t};`}showTables(e,t){return`SELECT COMMENT "comment",TABLE_NAME "name",ROW_COUNT "table_rows"
        FROM information_schema.TABLES  WHERE TABLE_SCHEMA = '${t}' and TABLE_TYPE<>'VIEW' ORDER BY TABLE_NAME;`}showDatabases(){return"show databases;"}showSchemas(){return'SELECT SCHEMA_NAME "schema" FROM INFORMATION_SCHEMA.SCHEMATA;'}tableTemplate(){return`CREATE TABLE table_name$1(  
    id int NOT NULL PRIMARY KEY AUTOINCREMENT,
    create_time DATE,
    name$2 VARCHAR(255)
);
COMMENT ON TABLE table_name$1 IS '$3';
COMMENT ON COLUMN table_name$1.name$2 IS '$4';`}viewTemplate(){return`CREATE VIEW view_name$1
AS
SELECT * FROM $2`}procedureTemplate(){return`create procedure proc_name$1() returns string
language javascript
as $$
    $2return 1+1;
$$;`}triggerTemplate(){return`CREATE TRIGGER tri_name$1
BEFORE INSERT ON table_name$2
FOR EACH ROW BEGIN
    $3
END;`}functionTemplate(){return`CREATE FUNCTION fun_name$1() RETURNS int
AS
$$
    $2return 1;
$$`}}class Y extends N{showVersion(){return"select sqlite_version() as server_version"}updateColumn(e,t){throw new Error("SQLite not support update column.")}updateColumnSql(e){throw new Error("SQLite not support update column.")}createIndex(e){const{table:t,column:n="$2"}=e;return`CREATE INDEX ${`${t}_${n}`} ON ${t}(${n});`}showIndex(e,t){return`SELECT name index_name FROM sqlite_master WHERE type='index' and tbl_name='${t}' `}dropIndex(e,t){return`DROP INDEX ${t};`}showSchemas(){throw new Error("Method not implemented.")}showTables(e,t){return"SELECT name, type FROM sqlite_master WHERE type='table' ORDER BY type ASC, name ASC;"}addColumn(e,t){return`ALTER TABLE ${e} 
    ADD COLUMN $1 [type$2];`}showColumns(e,t){return`SELECT t1.*,t1.pk "key",t1.dflt_value "defaultValue",t2."table" "to_table",t2."to" "to_column" FROM PRAGMA_TABLE_INFO('${t}') t1
        left join (
            SELECT * FROM  pragma_foreign_key_list('${t}')
        ) t2  on t1.name=t2.'from';`}showViews(e,t){return"SELECT name, type FROM sqlite_master WHERE type='view' AND name <> 'sqlite_sequence' AND name <> 'sqlite_stat1' ORDER BY type ASC, name ASC;"}showUsers(){throw new Error("Method not implemented.")}createUser(){throw new Error("Method not implemented.")}showTriggers(e){throw new Error("Method not implemented.")}showProcedures(e){throw new Error("Method not implemented.")}showFunctions(e){throw new Error("Method not implemented.")}buildPageSql(e,t,n){return`SELECT * FROM ${t} LIMIT ${n};`}countSql(e,t){throw new Error("Method not implemented.")}createDatabase(e){throw new Error("Method not implemented.")}truncateDatabase(e){throw new Error("Method not implemented.")}updateTable(e){throw new Error("Method not implemented.")}showTableSource(e,t){return`SELECT sql "Create Table" FROM sqlite_master where name='${t}' and type='table';`}showViewSource(e,t){return`SELECT sql "Create View" FROM sqlite_master where name='${t}' and type='view';`}showProcedureSource(e,t){throw new Error("Method not implemented.")}showFunctionSource(e,t){throw new Error("Method not implemented.")}showTriggerSource(e,t){throw new Error("Method not implemented.")}tableTemplate(){return`CREATE TABLE table_name$1(  
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    content TEXT
);`}viewTemplate(){return`CREATE VIEW view_name$1
AS
SELECT * FROM $2`}procedureTemplate(){throw new Error("Method not implemented.")}triggerTemplate(){throw new Error("Method not implemented.")}functionTemplate(){throw new Error("Method not implemented.")}processList(){throw new Error("Method not implemented.")}variableList(){throw new Error("Method not implemented.")}statusList(){throw new Error("Method not implemented.")}}class se extends Y{showVersion(){return"SELECT library_version as server_version from pragma_version()"}pingDataBase(e,t){return`set schema '${e}';`}showDatabases(){return'SELECT DISTINCT catalog_name "Database" from information_schema.schemata ORDER BY catalog_name'}showSchemas(e){return`SELECT schema_name "schema" from information_schema.schemata WHERE catalog_name='${e}' ORDER BY schema_name`}showTables(e,t){return`SELECT table_name "name" FROM information_schema.tables
        WHERE table_type in ('BASE TABLE','LOCAL TEMPORARY') and table_catalog='${e}' and table_schema = '${t}' order by table_name`}showViews(e,t){return`
SELECT table_name "name",1 "view_group",null "source" FROM information_schema.tables
        WHERE table_type='VIEW' and table_catalog='${e}' and table_schema = '${t}'
        UNION all
SELECT viewname "name",2 "view_group",definition "source" FROM pg_catalog.pg_views
        WHERE schemaname = '${t}'
ORDER BY "view_group",name`}tableTemplate(){return`CREATE TABLE table_name$1(  
    id INTEGER NOT NULL PRIMARY KEY,
    content TEXT
);`}showColumns(e,t){return["system","temp"].includes(e)?`SELECT column_name "name", data_type "type",
        column_default "defaultValue", is_nullable "nullable"
        FROM information_schema.columns c
        WHERE c.table_schema = '${e}' AND c.table_name = '${t}' 
        ORDER BY c.ORDINAL_POSITION;`:`SELECT t1.*,t1.pk "key",t1.dflt_value "defaultValue" FROM PRAGMA_TABLE_INFO('${t}') t1;`}updateColumn(e,t){const{name:n,type:r}=t;return`-- change column type
ALTER TABLE ${e} 
    ALTER COLUMN ${n} TYPE ${r};
-- change column name
ALTER TABLE ${e} 
    RENAME COLUMN ${n} TO ${n};`}updateColumnSql(e){return new k(e).genAlterSQL()}}function le(a){switch(a||(a=c.MYSQL),a){case null:case c.MYSQL:return new P;case c.MARIA_DB:return new ee;case c.MSSQL:return new ne;case c.SQLITE:return new Y;case c.DUCK_DB:return new se;case c.REDSHIFT:return new re;case c.SNOWFLAKE:return new oe;case c.PG:return new W;case c.CLICKHOUSE:return new J;case c.DM:return new Z;case c.ORACLE:return new H;case c.MONGO_DB:return new te;case c.NEO4J:return new ae}return new z}class h{constructor(e){this.meta=e,this.dialect=le(e.dbType),this.wrappedTable=$(this.meta.table,this.meta.dbType,Q.Always)}updateTable(e){return this.dialect.updateTable(e)}columnTypes(){return["INTEGER",{label:"VARCHAR",value:"VARCHAR(255)"},{label:"CHAR",value:"CHAR(50)"},"hr","DATE","TIMESTAMP","hr","BOOLEAN","FLOAT","DOUBLE","hr","TEXT","JSON","BLOB"]}strategys(){return["RESTRICT","CASCADE","SET NULL","SET DEFAULT","NO ACTION"]}newColumn(e){const{name:t,type:n,isNotNull:r}=e,o=r?" NOT NULL":"";return`ALTER TABLE ${this.wrappedTable} ADD COLUMN ${$(t,this.meta.dbType)} ${n}${o}`}updateColumn(e){return this.dialect.updateColumnSql({...e,table:this.meta.table})}dropColumn(e){return`ALTER TABLE ${this.wrappedTable} DROP COLUMN ${$(e,this.meta.dbType)}`}formatIndexType(e){return e.index_type}indexTypes(){return[{label:"INDEX",value:"INDEX"},{label:"UNIQUE",value:"UNIQUE"}]}dropIndex(e){return this.dialect.dropIndex(this.wrappedTable,e)}showChecks(){return this.dialect.showChecks(this.meta.schema,this.meta.table)}showForeignKeys(){return`SELECT
c.COLUMN_NAME column_name, ik.CONSTRAINT_NAME constraint_name,
ik.REFERENCED_TABLE_NAME referenced_table, ik.REFERENCED_COLUMN_NAME referenced_column,
UPDATE_RULE "updateRule",
DELETE_RULE "deleteRule"
FROM
information_schema.columns c join information_schema.KEY_COLUMN_USAGE ik on c.table_schema = ik.TABLE_SCHEMA
and c.table_name = ik.TABLE_NAME and c.COLUMN_NAME = ik.COLUMN_NAME
JOIN information_schema.REFERENTIAL_CONSTRAINTS ir on ik.CONSTRAINT_NAME=ir.CONSTRAINT_NAME
WHERE c.table_schema = '${this.meta.schema}' and c.table_name = '${this.meta.table}' ORDER BY ik.CONSTRAINT_NAME;`}newForeignKey(e){const{column:t,foreignKeyName:n,refTable:r,refColumn:o,onUpdate:s,onDelete:l}=e,i=s=="NO ACTION"?"":` ON UPDATE ${s}`,E=l=="NO ACTION"?"":` ON DELETE ${l}`;return new d(`ALTER TABLE "${this.meta.table}"`).if(n,()=>`ADD CONSTRAINT ${n}`).if(!n,"ADD").append(`FOREIGN KEY ("${t}") REFERENCES "${r}"("${o}")${i}${E};`).toString()}dropForignKey(e){return`ALTER TABLE "${this.meta.table}" DROP CONSTRAINT ${e};`}newCheck(e){return`ALTER TABLE ${this.wrappedTable} ADD CHECK (${e});`}dropCheck(e){return`ALTER TABLE ${this.wrappedTable} DROP CONSTRAINT ${e};`}splitColumn(e,t='"'){return e.map(n=>t+n+t).join(",")}}class ie extends h{columnTypes(){return["Int32","String","Float32","hr","Date","DateTime","hr","BOOLEAN","UUID",{label:"Array",value:"Array(String)"},"hr","JSON",{label:"Tuple",value:"Tuple(String)"},{label:"Map",value:"Map(String,String)"}]}newColumn(e){const{name:t,type:n,defaultValue:r,comment:o}=e;return new d(`ALTER TABLE ${this.wrappedTable} ADD COLUMN "${t}" ${n}`).if(!_(r),`DEFAULT ${A(r,n)}`).if(o,`COMMENT '${o}'`).toString()}newIndex(e){const{columns:t}=e;return`ALTER TABLE "${this.meta.table}" ADD INDEX ${t.join("")}_${new Date().getTime()}_index expression TYPE type GRANULARITY value AFTER ${this.splitColumn(t)}`}showForeignKeys(){return null}showChecks(){return null}}class ce extends h{newColumn(e){const{name:t,type:n,defaultValue:r,isNotNull:o}=e;return new d(`ALTER TABLE ${$(this.meta.table,this.meta.dbType)} ADD ${$(t,this.meta.dbType)} ${n}`).if(o,"NOT NULL").if(!_(r),`DEFAULT ${A(r,n)}`).toString()}newIndex(e){const{table:t=this.meta.table,columns:n,type:r}=e,o=`${t}_${n.join("_")}_${new Date().getTime()}`;return`CREATE ${r=="UNIQUE"?"UNIQUE":""} INDEX ${o} ON "${t}"(${this.splitColumn(n)});`}showForeignKeys(){return this.dialect.showForeignKeys(this.meta.schema,this.meta.table)}}class Ee extends h{indexTypes(){return[{label:"INDEX",value:"INDEX"},{label:"UNIQUE",value:"UNIQUE"},{label:"FULLTEXT",value:"FULLTEXT"}]}columnTypes(){return["INT",{label:"VARCHAR",value:"VARCHAR(255)"},{label:"CHAR",value:"CHAR(50)"},"hr","DATETIME","TIMESTAMP","DATE","hr","BIT","FLOAT","DOUBLE",{label:"DECIMAL",value:"DECIMAL(10,2)"},"BIGINT","hr","TEXT","JSON","BLOB","hr",{label:"ENUM",value:"ENUM('item')"},{label:"SET",value:"SET('item')"}]}newColumn(e){const{name:t,type:n,comment:r,defaultValue:o,isNotNull:s,unsigned:l,zerofill:i}=e;return console.log(e),new d(`ALTER TABLE ${this.wrappedTable} ADD COLUMN \`${t}\` ${n}`).if(l&&l!=0,"UNSIGNED").if(i,"ZEROFILL").if(s,"NOT NULL").if(r,`COMMENT '${r}'`).if(!_(o),`DEFAULT ${A(o,n)}`).toString()}formatIndexType(e){const t=e.index_type.toUpperCase();return t=="BTREE"?e.index_name=="PRIMARY"?"PRIMARY":B(e.isUnique)?"UNIQUE":"KEY":t}newIndex(e){const{type:t="key",columns:n}=e;return`ALTER TABLE \`${this.meta.table}\` ADD ${t} (${this.splitColumn(n,"`")})`}newForeignKey(e){const{column:t,foreignKeyName:n,refTable:r,refColumn:o,onUpdate:s,onDelete:l}=e,i=s=="NO ACTION"?"":` ON UPDATE ${s}`,E=l=="NO ACTION"?"":` ON DELETE ${l}`;return new d(`ALTER TABLE \`${this.meta.table}\``).if(n,()=>`ADD CONSTRAINT ${n}`).if(!n,"ADD").append(`FOREIGN KEY (\`${t}\`) REFERENCES \`${r}\`(\`${o}\`)${i}${E};`).toString()}dropForignKey(e){return`ALTER TABLE \`${this.meta.table}\` DROP FOREIGN KEY ${e};`}}class ue extends h{newIndex(e){const{table:t=this.meta.table,columns:n,type:r}=e,o=`${t}_${n.join("_")}_${new Date().getTime()}`;return`CREATE ${r=="UNIQUE"?"UNIQUE":""} INDEX ${o} ON "${t}"(${this.splitColumn(n)})`}newColumn(e){const{name:t,type:n,isNotNull:r,defaultValue:o,comment:s}=e;return new d(`ALTER TABLE ${$(this.meta.table,this.meta.dbType)} ADD ${t} ${n}`).if(!_(o),`DEFAULT ${A(o,n)}`).if(r,"NOT NULL").if(s,`;
COMMENT ON COLUMN ${this.wrappedTable}."${t.toUpperCase()}" is '${s}';`).toString()}newForeignKey(e){const{column:t,foreignKeyName:n,refTable:r,refColumn:o,onUpdate:s,onDelete:l}=e,i=s=="NO ACTION"?"":` ON UPDATE ${s}`,E=l=="NO ACTION"?"":` ON DELETE ${l}`,m=n||`${t}_${r}_${o}_fk_${Math.floor(Math.random()*30)}`;return`ALTER TABLE "${this.meta.table}" ADD CONSTRAINT ${m} FOREIGN KEY ("${t}") REFERENCES ${r}(${o})${i}${E};`}showForeignKeys(){var t;let{schema:e}=this.meta;return(e==null?void 0:e.toLowerCase())==((t=this.meta.user)==null?void 0:t.toLowerCase())&&(e=void 0),this.dialect.showForeignKeys(e,this.meta.table)}}class me extends h{newColumn(e){const{name:t,type:n,comment:r,defaultValue:o,isNotNull:s}=e,l=this.wrappedTable;return new d(`ALTER TABLE ${l} ADD COLUMN "${t}" ${n}`).if(s,"NOT NULL").if(!_(o),`DEFAULT ${A(o,n)}`).append(";").if(r,`
COMMENT ON COLUMN ${l}."${t}" is '${r}';`).toString()}columnTypes(){return["INTEGER",{label:"VARCHAR",value:"VARCHAR(255)"},{label:"CHAR",value:"CHAR(50)"},"TIMESTAMP","DATE","BOOLEAN","FLOAT","TEXT","JSON","BLOB"]}indexTypes(){return[{label:"INDEX",value:"INDEX"},{label:"UNIQUE",value:"UNIQUE"},{label:"HASH",value:"HASH"}]}newIndex(e){const{table:t=this.meta.table,columns:n,type:r}=e,o=r=="HASH"?"hash":"btree";return`CREATE ${r=="UNIQUE"?"UNIQUE":""} INDEX ${n.join("_")}_${new Date().getTime()}_index ON "${t}" USING ${o} (${this.splitColumn(n)});`}showForeignKeys(){return`SELECT
      refc.constraint_name constraint_name,
      STRING_AGG(distinct kcu.column_name, ',') AS column_name,
      ccu.table_name AS referenced_table,
      STRING_AGG(distinct ccu.column_name, ',') AS referenced_column,
      STRING_AGG(
          distinct kcu.ordinal_position :: text,
          ','
      ) AS ord_position,
      refc.update_rule "updateRule",
      refc.delete_rule "deleteRule"
  FROM
      information_schema.referential_constraints AS refc,
      information_schema.key_column_usage AS kcu,
      information_schema.constraint_column_usage AS ccu
  WHERE
      refc.constraint_schema = '${this.meta.schema}'
      AND refc.constraint_name = kcu.constraint_name
      AND refc.constraint_schema = kcu.table_schema
      AND ccu.constraint_name = refc.constraint_name
      AND kcu.table_name = '${this.meta.table}'
  GROUP BY
      refc.constraint_name,
      refc.update_rule,
      refc.delete_rule,
      kcu.table_name,
      ccu.table_schema,
      ccu.table_name
  ORDER BY ord_position;`}}class de extends h{newIndex(e){throw new Error("Method not implemented.")}dropForignKey(e){return`ALTER TABLE "${this.meta.table}" DROP CONSTRAINT "${e}";`}showForeignKeys(){return`select
       rco.constraint_name "constraint_name",
       rco.UPDATE_RULE "updateRule",
       rco.DELETE_RULE "deleteRule",
       pk_tco.table_name "referenced_table"
from information_schema.referential_constraints rco
    join information_schema.table_constraints fk_tco on fk_tco.constraint_name = rco.constraint_name and fk_tco.constraint_schema = rco.constraint_schema
    join information_schema.table_constraints pk_tco on pk_tco.constraint_name = rco.unique_constraint_name and pk_tco.constraint_schema = rco.unique_constraint_schema
    WHERE fk_tco.TABLE_SCHEMA='${this.meta.schema}' and fk_tco.table_name='${this.meta.table}' 
    ORDER BY rco.CREATED`}}class Te extends h{newIndex(e){const{table:t=this.meta.table,columns:n}=e;return`CREATE INDEX ${`${t}_${n.join("_")}_${new Date().getTime()}`} ON "${t}"(${this.splitColumn(n)});`}showForeignKeys(){return`SELECT "from" column_name, "table" referenced_table, "to" referenced_column,
        on_update, on_delete 
        FROM pragma_foreign_key_list('${this.meta.table}');`}showChecks(){return null}}class _e extends h{newColumn(e){const{type:t,defaultValue:n}=e;return new d(super.newColumn(e)).if(!_(n),`DEFAULT ${A(n,t)}`).toString()}newIndex(e){const{table:t=this.meta.table,columns:n}=e;return`CREATE INDEX ${`${t}_${n.join("_")}_${new Date().getTime()}`} ON "${t}"(${this.splitColumn(n)});`}showForeignKeys(){return`SELECT constraint_column_names "column_name" FROM duckdb_constraints()
        WHERE constraint_type='FOREIGN KEY' and database_name not in ('system','temp') and schema_name='${this.meta.schema}' and table_name='${this.meta.table}'`}showChecks(){return null}}function I(a){switch(a.dbType){case c.PG:case c.REDSHIFT:return new me(a);case c.DM:case c.ORACLE:return new ue(a);case c.MSSQL:return new ce(a);case c.SNOWFLAKE:return new de(a);case c.CLICKHOUSE:return new ie(a);case c.DUCK_DB:return new _e(a);case c.SQLITE:return new Te(a);case c.MYSQL:case c.MARIA_DB:default:return new Ee(a)}}const M=V("design",{state:()=>({dbType:c.MYSQL,schema:"",table:"",columns:[]}),getters:{canAlterTable(a){return![c.SQLITE].includes(a.dbType)},supportForignKey(a){return![c.CLICKHOUSE].includes(a.dbType)},supportCheck(a){return![c.SQLITE,c.DUCK_DB,c.CLICKHOUSE,c.SNOWFLAKE].includes(a.dbType)},supportIndex(a){return![c.SNOWFLAKE].includes(a.dbType)}},actions:{updateDBType(a){this.dbType=a},updateFullInfo(a){for(const e in a)this[e]=a[e]}}}),Ae={components:{UxGrid:b.UxGrid,UxTableColumn:b.UxTableColumn,codemirror:f},mixins:[O],props:["remainHeight","activePanel"],data(){return{indexes:[],indexTypes:[],dbType:null,columns:[],dialect:null,loading:!0,index:{visible:!1,loading:!1,column:null,type:null}}},computed:{...w(M,["canAlterTable"]),previewSQL(){var a;return((a=this.index.columns)==null?void 0:a.length)>0?this.dialect.newIndex({...this.index}):""}},mounted(){this.on("designMeta",a=>{const{columns:e,dbType:t}=a;this.columns=e,this.dbType=t,this.dialect=I(a),this.indexTypes=this.dialect.indexTypes(),this.loadIndexes()}).on("columns",a=>{this.columns=a}).on("indexes",a=>{this.indexes=a,this.loading=!1}).on("success",a=>{a=="index"&&(this.index.loading=!1,this.index.visible=!1,this.loadIndexes())}).on("error",a=>{this.index.loading=!1})},methods:{loadIndexes(){this.emit("indexes"),this.loading=!0},openIndexDialog(){this.index={visible:!0,loading:!1,column:null,type:"INDEX"}},getIndexType(a){return this.dialect.formatIndexType(a)},formatUnique(a){return B(a)},doCreate(){this.index.loading=!0,this.emit("execute",{type:"index",sql:this.previewSQL})},deleteConfirm(a){this.$confirm(this.$t("design.deleteIndexConfirm"),"Warning",{confirmButtonText:this.$t("common.ok"),cancelButtonText:this.$t("common.cancel"),type:"warning"}).then(()=>{this.emit("execute",{type:"index",sql:this.dialect.dropIndex(a.index_name)})})}}};var Ne=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"design-toolbar"},[["ClickHouse"].includes(e.dbType)?e._e():t("vsc-button",{attrs:{type:"icon",icon:"codicon-add text-base",title:e.$t("common.new")},on:{click:e.openIndexDialog}}),t("vsc-button",{attrs:{type:"icon",icon:"codicon-refresh text-base",title:e.$t("common.refresh")},on:{click:e.loadIndexes}})],1),e.activePanel=="index"?t("ux-grid",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.indexes,stripe:"",height:e.remainHeight}},[t("ux-table-column",{attrs:{resizable:!0,align:"center",field:"index_name",title:e.$t("design.indexName"),"show-overflow-tooltip":"true"}}),t("ux-table-column",{attrs:{resizable:!0,align:"center",field:"column_name",title:e.$t("design.column"),"show-overflow-tooltip":"true"}}),t("ux-table-column",{attrs:{align:"center",field:"isUnique",title:e.$t("design.unique"),"show-overflow-tooltip":"true"},scopedSlots:e._u([{key:"default",fn:function({row:n}){return[t(p,{attrs:{disabled:"",value:e.formatUnique(n.isUnique)}})]}}],null,!1,1754336905)}),t("ux-table-column",{attrs:{resizable:!0,align:"center",field:"index_type",title:e.$t("common.type"),"show-overflow-tooltip":"true"},scopedSlots:e._u([{key:"default",fn:function({row:n}){return[e._v(" "+e._s(e.getIndexType(n))+" ")]}}],null,!1,1248885728)}),["PostgreSQL"].includes(e.dbType)?t("ux-table-column",{attrs:{resizable:!0,align:"center",field:"index_method",title:e.$t("design.indexMethod"),"show-overflow-tooltip":"true"}}):e._e(),["ClickHouse"].includes(e.dbType)?e._e():t("ux-table-column",{attrs:{title:e.$t("design.operation"),width:"120"},scopedSlots:e._u([{key:"default",fn:function({row:n}){return[t("div",{staticClass:"text-center"},[t("vsc-button",{attrs:{type:"icon",icon:"codicon-remove text-base",title:"delete"},on:{click:function(r){return e.deleteConfirm(n)}}})],1)]}}],null,!1,2569677360)})],1):e._e(),t(y,{attrs:{title:e.$t("design.newIndex"),width:"480px",visible:e.index.visible,closeOnClickModal:!1,center:""},on:{"update:visible":function(n){return e.$set(e.index,"visible",n)}}},[t(D,{attrs:{inline:!0,"label-width":"75px"}},[t(T,{scopedSlots:e._u([{key:"label",fn:function(){return[t("RedMark"),e._v(e._s(e.$t("design.column"))+" ")]},proxy:!0}])},[t(R,{staticClass:"!w-[150px]",attrs:{size:"mini",filterable:"",multiple:""},model:{value:e.index.columns,callback:function(n){e.$set(e.index,"columns",n)},expression:"index.columns"}},e._l(e.columns,function(n){return t(C,{key:n.name,attrs:{label:n.name,value:n.name}})}),1)],1),t(T,{scopedSlots:e._u([{key:"label",fn:function(){return[t("RedMark"),e._v(e._s(e.$t("common.type"))+" ")]},proxy:!0}])},[t(R,{staticClass:"!w-[110px]",attrs:{size:"mini"},model:{value:e.index.type,callback:function(n){e.$set(e.index,"type",n)},expression:"index.type"}},e._l(e.indexTypes,function(n,r){return t(C,{key:r,attrs:{label:n.label,value:n.value}})}),1)],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("vsc-button",{attrs:{type:"secondary"},on:{click:function(n){e.index.visible=!1}}},[e._v(e._s(e.$t("common.cancel")))]),t("vsc-button",{attrs:{type:"primary",loading:e.index.loading},on:{click:e.doCreate}},[e._v(e._s(e.$t("common.ok")))]),t("br"),e._v(" "),t("br"),t("codemirror",{directives:[{name:"show",rawName:"v-show",value:e.previewSQL,expression:"previewSQL"}],ref:"cmEditor",attrs:{value:e.previewSQL}})],1)],1)],1)},pe=[],Re=S(Ae,Ne,pe,!1,null,null,null,null);const Ce=Re.exports;const be={components:{codemirror:f},mixins:[O],props:["activePanel"],data(){return{loading:!1,ddl:"",dbType:"",user:null}},mounted(){this.on("ddl",({ddl:a,dbType:e})=>{this.dbType=e,this.loading=!1,this.ddl=a}).on("user",a=>{this.user=a,this.emit("ddl"),this.loading=!0}).emit("user")},methods:{copyDDL(){navigator.clipboard.writeText(this.ddl),F("Copy DDL success!")}}};var he=function(){var e=this,t=e._self._c;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}]},[t("div",{ref:"infoPanel",staticClass:"design-toolbar"},[t("vsc-button",{attrs:{type:"icon",icon:"el-icon-document-copy text-base",title:"Copy DDL"},on:{click:e.copyDDL}}),t("vsc-button",{attrs:{type:"icon",icon:"codicon-refresh text-base",title:e.$t("common.refresh")},on:{click:function(n){return e.emit("ddl")}}})],1),e.activePanel=="ddl"?t("codemirror",{attrs:{dbType:e.dbType,value:e.ddl}}):e._e()],1)},Le=[],Oe=S(be,he,Le,!1,null,null,null,null);const Se=Oe.exports,$e={components:{UxGrid:b.UxGrid,UxTableColumn:b.UxTableColumn,codemirror:f},mixins:[O],props:["remainHeight","activePanel"],data(){return{foreignKeys:[],dbType:null,tables:[],curTableColumns:[],columns:[],strategys:[],dialect:null,loading:!0,status:{visible:!1,loading:!1},editModel:{column:null,refTable:null,refColumn:null,onUpdate:"NO ACTION",onDelete:"NO ACTION"}}},computed:{...w(M,["canAlterTable"]),previewSQL(){const{column:a,refTable:e,refColumn:t}=this.editModel;return a||e||t?this.dialect.newForeignKey(this.editModel):""}},mounted(){this.on("designMeta",a=>{const{columns:e,dbType:t}=a;this.columns=e,this.dbType=t,this.dialect=I(a),this.strategys=this.dialect.strategys(),this.loadForeignKeys()}).on("columns",a=>{this.columns=a}).on("foreignKeys",a=>{this.loading=!1,this.foreignKeys=a}).on("columnsById",a=>{this.editModel.refColumn="",this.curTableColumns=a}).on("success",a=>{a=="fk"&&(this.status.loading=!1,this.status.visible=!1,this.loadForeignKeys())}).on("error",()=>{this.status.loading=!1}).on("tables",a=>{this.tables=a}).emit(["tables"])},methods:{getColumns(a){this.emit("columnsById",a)},loadForeignKeys(){const a=this.dialect.showForeignKeys();a&&(this.loading=!0,this.emit("foreignKeys",a))},openFkDialog(){this.status={visible:!0,loading:!1},this.editModel={column:null,refTable:null,refColumn:null,onUpdate:"NO ACTION",onDelete:"NO ACTION"}},doCreate(){this.status.loading=!0,this.emit("execute",{type:"fk",sql:this.previewSQL})},deleteConfirm(a){this.$confirm(this.$t("design.deleteFkConfirm"),"Warning",{confirmButtonText:this.$t("common.ok"),cancelButtonText:this.$t("common.cancel"),type:"warning"}).then(()=>{this.emit("execute",{type:"fk",sql:this.dialect.dropForignKey(a.constraint_name)})})}}};var Me=function(){var e=this,t=e._self._c;return t("div",[e.canAlterTable?t("div",{staticClass:"design-toolbar"},[t("vsc-button",{attrs:{type:"icon",icon:"codicon-add text-base",title:e.$t("common.new")},on:{click:e.openFkDialog}}),t("vsc-button",{attrs:{type:"icon",icon:"codicon-refresh text-base",title:e.$t("common.refresh")},on:{click:e.loadForeignKeys}})],1):e._e(),e.activePanel=="foreignKey"?t("ux-grid",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.foreignKeys,stripe:"",height:e.remainHeight}},[e.canAlterTable?t("ux-table-column",{attrs:{resizable:!0,align:"center",field:"constraint_name",title:e.$t("design.constraintName"),"show-overflow-tooltip":"true"}}):e._e(),t("ux-table-column",{attrs:{resizable:!0,align:"center",field:"column_name",title:e.$t("design.column"),"show-overflow-tooltip":"true"}}),t("ux-table-column",{attrs:{resizable:!0,align:"center",field:"referenced_table",title:e.$t("design.referencedTable"),"show-overflow-tooltip":"true"}}),t("ux-table-column",{attrs:{resizable:!0,align:"center",field:"referenced_column",title:e.$t("design.referencedColumn"),"show-overflow-tooltip":"true"}}),t("ux-table-column",{attrs:{align:"center",field:"updateRule",title:e.$t("design.updateRule"),"show-overflow-tooltip":"true"}}),t("ux-table-column",{attrs:{align:"center",field:"deleteRule",title:e.$t("design.deleteRule"),"show-overflow-tooltip":"true"}}),e.canAlterTable?t("ux-table-column",{attrs:{title:e.$t("design.operation"),width:"120"},scopedSlots:e._u([{key:"default",fn:function({row:n}){return[t("div",{staticClass:"text-center"},[t("vsc-button",{attrs:{type:"icon",icon:"codicon-remove text-base",title:"delete"},on:{click:function(r){return e.deleteConfirm(n)}}})],1)]}}],null,!1,2569677360)}):e._e()],1):e._e(),t(y,{attrs:{title:e.$t("design.newForeignKey"),visible:e.status.visible,width:"740px",closeOnClickModal:!1,center:""},on:{"update:visible":function(n){return e.$set(e.status,"visible",n)}}},[t(D,{attrs:{inline:!0,"label-width":"150px","label-position":"left"}},[t(T,{scopedSlots:e._u([{key:"label",fn:function(){return[t("RedMark"),e._v(e._s(e.$t("design.column"))+" ")]},proxy:!0}])},[t(R,{staticClass:"!w-[170px] mr-4",attrs:{size:"mini",filterable:""},model:{value:e.editModel.column,callback:function(n){e.$set(e.editModel,"column",n)},expression:"editModel.column"}},e._l(e.columns,function(n){return t(C,{key:n.name,attrs:{label:n.name,value:n.name}})}),1)],1),[].includes(e.dbType)?e._e():t(T,{attrs:{label:e.$t("design.foreignKeyName")}},[t("vsc-input",{staticClass:"!w-[170px]",model:{value:e.editModel.foreignKeyName,callback:function(n){e.$set(e.editModel,"foreignKeyName",n)},expression:"editModel.foreignKeyName"}})],1),t("br"),t(T,{scopedSlots:e._u([{key:"label",fn:function(){return[t("RedMark"),e._v(e._s(e.$t("design.referencedTable"))+" ")]},proxy:!0}])},[t(R,{staticClass:"!w-[170px] mr-4",attrs:{size:"mini",filterable:""},model:{value:e.editModel.refTable,callback:function(n){e.$set(e.editModel,"refTable",n)},expression:"editModel.refTable"}},e._l(e.tables,function(n){return t(C,{key:n.name,attrs:{label:n.name,value:n.name},nativeOn:{click:function(r){return e.getColumns(n.id)}}})}),1)],1),t(T,{scopedSlots:e._u([{key:"label",fn:function(){return[t("RedMark"),e._v(e._s(e.$t("design.referencedColumn"))+" ")]},proxy:!0}])},[t(R,{staticClass:"!w-[170px]",attrs:{size:"mini",filterable:""},model:{value:e.editModel.refColumn,callback:function(n){e.$set(e.editModel,"refColumn",n)},expression:"editModel.refColumn"}},e._l(e.curTableColumns,function(n){return t(C,{key:n.name,attrs:{label:n.name,value:n.name}})}),1)],1),t(T,{attrs:{label:"On Update"}},[t(R,{staticClass:"!w-[170px] mr-4",attrs:{size:"mini",filterable:""},model:{value:e.editModel.onUpdate,callback:function(n){e.$set(e.editModel,"onUpdate",n)},expression:"editModel.onUpdate"}},e._l(e.strategys,function(n){return t(C,{key:n,attrs:{label:n,value:n}})}),1)],1),t(T,{attrs:{label:"On Delete"}},[t(R,{staticClass:"!w-[170px]",attrs:{size:"mini",filterable:""},model:{value:e.editModel.onDelete,callback:function(n){e.$set(e.editModel,"onDelete",n)},expression:"editModel.onDelete"}},e._l(e.strategys,function(n){return t(C,{key:n,attrs:{label:n,value:n}})}),1)],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("vsc-button",{attrs:{type:"secondary"},on:{click:function(n){e.status.visible=!1}}},[e._v(e._s(e.$t("common.cancel")))]),t("vsc-button",{attrs:{type:"primary",loading:e.status.loading},on:{click:e.doCreate}},[e._v(e._s(e.$t("common.ok")))]),t("br"),e._v(" "),t("br"),t("codemirror",{directives:[{name:"show",rawName:"v-show",value:e.previewSQL,expression:"previewSQL"}],ref:"cmEditor",attrs:{value:e.previewSQL}})],1)],1)],1)},we=[],fe=S($e,Me,we,!1,null,null,null,null);const Ie=fe.exports;const ge={components:{UxGrid:b.UxGrid,UxTableColumn:b.UxTableColumn,codemirror:f},mixins:[O],props:["remainHeight","activePanel"],data(){return{table:null,dbType:null,typeSelector:{visible:!1,inputing:!1},types:[],typeSelectorVisible:!1,columnLoading:!0,columns:[],copyedColumns:[],dialect:null,editColumn:{name:"",type:""},column:{isNew:!0,editVisible:!1,editLoading:!1}}},computed:{...w(M,["canAlterTable"]),isSmall(){return window.innerWidth<=1200},isMySQL(){return["MySQL","MariaDB"].includes(this.dbType)},tilte(){const a=this.column.isNew?"design.newColumn":"design.updateColumn";return this.$t(a)},filterTypes(){return this.typeSelector.inputing&&this.editColumn.type?this.types.filter(a=>(a.label||a).match(new RegExp(this.editColumn.type,"i"))):this.types},previewSQL(){if(this.column.isNew){const{name:a,type:e}=this.editColumn;return a&&e?this.dialect.newColumn(this.editColumn):""}return this.dialect.updateColumn({table:this.table,newColumnName:this.editColumn.name,columnType:this.editColumn.type,nullable:!this.editColumn.isNotNull,...this.editColumn,type:X(this.editColumn)})},supportChangeIncrement(){return[c.MYSQL,c.MARIA_DB,c.PG].includes(this.dbType)}},mounted(){this.on("designMeta",a=>{this.columns=a.columns,this.copyedColumns=x.clone(a.columns),this.dbType=a.dbType,this.columnLoading=!1,this.dialect=I(a),this.types=this.dialect.columnTypes()}).on("columns",a=>{this.columns=a,this.copyedColumns=x.clone(a),this.columnLoading=!1}).on("success",a=>{a=="column"&&(this.column.editLoading=!1,this.column.editVisible=!1,this.loadColumns())}).on("error",()=>{this.column.editLoading=!1,this.loadColumns()})},methods:{not(...a){return!a.includes(this.dbType)},selectType(){const a=this.filterTypes[0];a&&(this.editColumn.type=a.value||a,this.typeSelector.visible=!1)},loadColumns(){this.emit("columns"),this.columnLoading=!0},newColumn(){this.editColumn={name:"",type:""},this.column.isNew=!0,this.column.editVisible=!0},openEdit(a){this.editColumn={...a,columnName:a.name,oldRow:a},this.column.isNew=!1,this.column.editVisible=!0,this.column.editLoading=!1},changeColumn(a,e){this.column.isNew=!1,this.editColumn={...a,columnName:a.name,oldRow:this.copyedColumns[e]},this.updateColumn()},updateColumn(){if(!this.previewSQL)return g("No any change!");if(this.column.editLoading=!0,this.column.isNew)return this.doCreate();try{this.emit("execute",{type:"column",sql:this.previewSQL})}catch(a){g(a.message),this.column.editLoading=!1}},doCreate(){this.emit("execute",{type:"column",sql:this.previewSQL})},deleteConfirm(a){this.$confirm(this.$t("design.deleteColumnConfirm"),"Warning",{confirmButtonText:this.$t("common.ok"),cancelButtonText:this.$t("common.cancel"),type:"warning"}).then(()=>{this.emit("execute",{type:"column",sql:this.dialect.dropColumn(a.name)})})}}};var De=function(){var e=this,t=e._self._c;return t("div",[e.canAlterTable?t("div",{ref:"infoPanel",staticClass:"design-toolbar"},[t("vsc-button",{attrs:{type:"icon",icon:"codicon-add text-base",title:e.$t("common.new")},on:{click:e.newColumn}}),t("vsc-button",{attrs:{type:"icon",icon:"codicon-refresh text-base",title:e.$t("common.refresh")},on:{click:e.loadColumns}})],1):e._e(),e.activePanel=="column"?t("ux-grid",{directives:[{name:"loading",rawName:"v-loading",value:e.columnLoading,expression:"columnLoading"}],staticStyle:{width:"100%"},attrs:{data:e.columns,stripe:"",height:e.remainHeight},on:{"row-dblclick":e.openEdit}},[t("ux-table-column",{attrs:{resizable:!0,align:"center",field:"name",title:e.$t("common.name"),width:"180","show-overflow-tooltip":"true"}}),t("ux-table-column",{attrs:{resizable:!0,align:"center",field:"type",title:e.$t("common.type"),width:e.isSmall?100:130,"show-overflow-tooltip":"true"}}),["DuckDB"].includes(e.dbType)?e._e():t("ux-table-column",{attrs:{resizable:!0,align:"center",field:"comment",title:e.$t("common.comment"),width:e.isSmall?90:190,"show-overflow-tooltip":"true"},scopedSlots:e._u([{key:"default",fn:function({row:n}){return[t("span",{attrs:{title:n==null?void 0:n.comment}},[e._v(" "+e._s(n==null?void 0:n.comment)+" ")])]}}],null,!1,3743100364)}),t("ux-table-column",{attrs:{resizable:!0,align:"center",field:"maxLength",width:e.isSmall?60:80,title:e.$t("design.length"),"show-overflow-tooltip":"true"}}),t("ux-table-column",{attrs:{resizable:!0,align:"center",field:"defaultValue",width:e.isSmall?80:110,title:e.$t("common.default"),"show-overflow-tooltip":"true"}}),t("ux-table-column",{attrs:{align:"center",title:"Not Null",width:e.isSmall?60:80},scopedSlots:e._u([{key:"default",fn:function({row:n,rowIndex:r}){return[t(p,{on:{change:function(o){return e.changeColumn(n,r)}},model:{value:n.isNotNull,callback:function(o){e.$set(n,"isNotNull",o)},expression:"row.isNotNull"}})]}}],null,!1,1185837067)}),t("ux-table-column",{attrs:{align:"center",title:e.$t("design.isPrimary"),width:e.isSmall?80:90,"show-overflow-tooltip":"true"},scopedSlots:e._u([{key:"default",fn:function({row:n}){return[t(p,{attrs:{disabled:"",value:n.isPrimary}})]}}],null,!1,907141511)}),t("ux-table-column",{attrs:{align:"center",title:e.$t("design.isUnique"),width:e.isSmall?60:80,"show-overflow-tooltip":"true"},scopedSlots:e._u([{key:"default",fn:function({row:n}){return[t(p,{attrs:{disabled:"",value:n.isUnique}})]}}],null,!1,266685784)}),e.isMySQL?[t("ux-table-column",{attrs:{align:"center",title:"UNSIGNED","show-overflow-tooltip":"true"},scopedSlots:e._u([{key:"default",fn:function({row:n,rowIndex:r}){return[t(p,{attrs:{"true-label":"1","false-label":"0"},on:{change:function(o){return e.changeColumn(n,r)}},model:{value:n.unsigned,callback:function(o){e.$set(n,"unsigned",o)},expression:"row.unsigned"}})]}}],null,!1,904193920)}),t("ux-table-column",{attrs:{align:"center",title:"Zerofill",width:e.isSmall?60:80,"show-overflow-tooltip":"true"},scopedSlots:e._u([{key:"default",fn:function({row:n,rowIndex:r}){return[t(p,{attrs:{"true-label":"1","false-label":"0"},on:{change:function(o){return e.changeColumn(n,r)}},model:{value:n.zerofill,callback:function(o){e.$set(n,"zerofill",o)},expression:"row.zerofill"}})]}}],null,!1,3974368196)})]:e._e(),["DuckDB"].includes(e.dbType)?e._e():t("ux-table-column",{attrs:{align:"center",title:e.$t("design.isAutoIncrement"),width:"100","show-overflow-tooltip":"true"},scopedSlots:e._u([{key:"default",fn:function({row:n,rowIndex:r}){return[t(p,{attrs:{disabled:!n.isPrimary||!e.supportChangeIncrement},on:{change:function(o){return e.changeColumn(n,r)}},model:{value:n.isAutoIncrement,callback:function(o){e.$set(n,"isAutoIncrement",o)},expression:"row.isAutoIncrement"}})]}}],null,!1,3312013931)}),["SQLite"].includes(e.dbType)?e._e():t("ux-table-column",{attrs:{title:e.$t("design.operation"),width:"120"},scopedSlots:e._u([{key:"default",fn:function({row:n,rowIndex:r}){return[t("div",{staticClass:"text-center"},[t("vsc-button",{attrs:{type:"icon",icon:"codicon-edit text-base",title:"edit"},on:{click:function(o){return e.openEdit(n,r)}}}),t("vsc-button",{attrs:{type:"icon",icon:"codicon-remove text-base",title:"delete"},on:{click:function(o){return e.deleteConfirm(n)}}})],1)]}}],null,!1,4165395426)})],2):e._e(),t(y,{attrs:{title:e.tilte,visible:e.column.editVisible,width:"640px",closeOnClickModal:!1,center:""},on:{"update:visible":function(n){return e.$set(e.column,"editVisible",n)}}},[t(D,{attrs:{inline:!0,"label-width":"90px"}},[t(T,{scopedSlots:e._u([{key:"label",fn:function(){return[t("RedMark"),e._v(e._s(e.$t("common.name"))+" ")]},proxy:!0}])},[t("vsc-input",{attrs:{size:"mini",fixed:""},model:{value:e.editColumn.name,callback:function(n){e.$set(e.editColumn,"name",n)},expression:"editColumn.name"}})],1),t("br"),t(T,{scopedSlots:e._u([{key:"label",fn:function(){return[t("RedMark"),e._v(e._s(e.$t("common.type"))+" ")]},proxy:!0}])},[t(q,{attrs:{placement:"bottom-start","popper-class":"!p-0",trigger:"click",tabindex:null},scopedSlots:e._u([{key:"reference",fn:function(){return[t("vsc-input",{attrs:{size:"mini",fixed:""},on:{input:function(n){e.typeSelector.inputing=!0,e.typeSelector.visible=!0}},nativeOn:{keyup:function(n){return!n.type.indexOf("key")&&e._k(n.keyCode,"enter",13,n.key,"Enter")?null:e.selectType.apply(null,arguments)},click:function(n){e.typeSelector.inputing=!1}},model:{value:e.editColumn.type,callback:function(n){e.$set(e.editColumn,"type",n)},expression:"editColumn.type"}})]},proxy:!0}]),model:{value:e.typeSelector.visible,callback:function(n){e.$set(e.typeSelector,"visible",n)},expression:"typeSelector.visible"}},[t("div",{staticClass:"max-h-[300px]"},[e._l(e.filterTypes,function(n,r){return[n=="hr"?t("div",{key:r,staticClass:"w-full type-hr bg-bg"}):t("div",{key:r,staticClass:"el-select-dropdown__item min-w-[190px] bg-[var(--vscode-dropdown-background)]",on:{click:function(o){e.editColumn.type=n.value||n,e.typeSelector.visible=!1}}},[e._v(" "+e._s(n.label||n)+" ")])]})],2)])],1),e.not("ClickHouse")?t(T,{attrs:{label:e.$t("design.isNotNull")}},[t(p,{model:{value:e.editColumn.isNotNull,callback:function(n){e.$set(e.editColumn,"isNotNull",n)},expression:"editColumn.isNotNull"}})],1):e._e(),e.isMySQL?t(T,{attrs:{label:"UNSIGNED"}},[t(p,{attrs:{"true-label":"1","false-label":"0"},model:{value:e.editColumn.unsigned,callback:function(n){e.$set(e.editColumn,"unsigned",n)},expression:"editColumn.unsigned"}})],1):e._e(),["SqlServer","DuckDB"].includes(e.dbType)?e._e():t(T,{attrs:{label:e.$t("common.comment")}},[t("vsc-input",{attrs:{size:"mini",fixed:""},model:{value:e.editColumn.comment,callback:function(n){e.$set(e.editColumn,"comment",n)},expression:"editColumn.comment"}})],1),!["SqlServer","Snowflake"].includes(e.dbType)||e.column.isNew?t(T,{attrs:{label:e.$t("common.default")}},[t("vsc-input",{attrs:{size:"mini",fixed:""},model:{value:e.editColumn.defaultValue,callback:function(n){e.$set(e.editColumn,"defaultValue",n)},expression:"editColumn.defaultValue"}})],1):e._e()],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("vsc-button",{attrs:{type:"secondary"},on:{click:function(n){e.column.editVisible=!1}}},[e._v(e._s(e.$t("common.cancel")))]),t("vsc-button",{attrs:{type:"primary",loading:e.column.editLoading},on:{click:e.updateColumn}},[e._v(e._s(e.$t("common.ok")))]),t("br"),e._v(" "),t("br"),t("codemirror",{directives:[{name:"show",rawName:"v-show",value:e.previewSQL,expression:"previewSQL"}],ref:"cmEditor",attrs:{value:e.previewSQL}})],1)],1)],1)},ye=[],Ue=S(ge,De,ye,!1,null,"2b52fb77",null,null);const ve=Ue.exports,xe={mixins:[O],data(){return{dialect:null,collations:[],table:{name:null,newTableName:null,comment:null,newComment:null,collation:null,newCollation:null}}},mounted(){this.on("designMeta",a=>{this.table.name=a.table,this.table.newTableName=a.table,this.table.comment=a.comment,this.table.newComment=a.comment,this.table.collation=a.collation,this.table.newCollation=a.collation,this.dialect=I(a)}).on("collations",a=>{this.collations=a})},methods:{updateTableMeta(){const a={...this.table,table:this.table.name};this.emit("updateTable",a);const e=this.dialect.updateTable(a);e?this.emit("execute",{type:"table",sql:e}):g("No any change!")}}};var Be=function(){var e=this,t=e._self._c;return t("div",{staticClass:"ml-4"},[t("div",{staticClass:"flex flex-col gap-y-2"},[t("div",{staticClass:"flex-wrap"},[t("div",{staticClass:"inline-block mr-5"},[t("label",{staticClass:"font-bold mr-5 inline-block"},[e._v(e._s(e.$t("design.table")))]),t("vsc-input",{staticClass:"!w-48",attrs:{required:""},on:{keyup:function(n){return!n.type.indexOf("key")&&e._k(n.keyCode,"enter",13,n.key,"Enter")?null:e.updateTableMeta.apply(null,arguments)}},model:{value:e.table.newTableName,callback:function(n){e.$set(e.table,"newTableName",n)},expression:"table.newTableName"}})],1),t("div",{staticClass:"inline-block mr-5"},[t("label",{staticClass:"font-bold mr-5 inline-block"},[e._v(e._s(e.$t("common.comment")))]),t("vsc-input",{staticClass:"!w-48",on:{keyup:function(n){return!n.type.indexOf("key")&&e._k(n.keyCode,"enter",13,n.key,"Enter")?null:e.updateTableMeta.apply(null,arguments)}},model:{value:e.table.newComment,callback:function(n){e.$set(e.table,"newComment",n)},expression:"table.newComment"}})],1)]),t("div",{staticClass:"flex-wrap"},[e.table.collation!=null&&e.collations.length>0?t("div",{staticClass:"inline-block mr-5"},[t("label",{staticClass:"font-bold mr-5 inline-block"},[e._v(e._s(e.$t("design.collate")))]),t(R,{attrs:{size:"small",filterable:""},model:{value:e.table.newCollation,callback:function(n){e.$set(e.table,"newCollation",n)},expression:"table.newCollation"}},e._l(e.collations,function(n){return t(C,{key:n.name,attrs:{label:n.name,value:n.name}})}),1)],1):e._e(),t("div",{staticClass:"inline-block pt-1"},[t("vsc-button",{attrs:{type:"success"},on:{click:e.updateTableMeta}},[e._v(e._s(e.$t("common.udpate")))])],1)])])])},Fe=[],He=S(xe,Be,Fe,!1,null,null,null,null);const Pe=He.exports,ke={components:{UxGrid:b.UxGrid,UxTableColumn:b.UxTableColumn,codemirror:f},mixins:[O],props:["remainHeight","activePanel"],data(){return{tableList:[],dbType:null,columns:[],dialect:null,loading:!0,status:{visible:!1,loading:!1},editModel:{clause:null}}},computed:{...w(M,["canAlterTable"]),previewSQL(){return this.editModel.clause?this.dialect.newCheck(this.editModel.clause):""}},mounted(){this.on("designMeta",a=>{const{columns:e,dbType:t}=a;this.columns=e,this.dbType=t,this.dialect=I(a),this.loadData()}).on("checks",a=>{this.loading=!1,this.tableList=a}).on("success",a=>{a=="check"&&(this.loadData(),this.status.visible=!1,this.status.loading=!1)}).on("error",a=>{this.status.loading=!1})},methods:{loadData(){const a=this.dialect.showChecks();if(!a){console.log("This database type does not currently support check."),this.loading=!1;return}this.loading=!0,this.emit("checks",a)},openDialog(){this.status={visible:!0,loading:!1},this.editModel={clause:null}},doCreate(){this.status.loading=!0,this.emit("execute",{type:"check",sql:this.previewSQL})},deleteConfirm(a){this.$confirm(this.$t("design.deleteCheckConfirm"),"Warning",{confirmButtonText:this.$t("common.ok"),cancelButtonText:this.$t("common.cancel"),type:"warning"}).then(()=>{this.emit("execute",{type:"check",sql:this.dialect.dropCheck(a.name)})})}}};var Ge=function(){var e=this,t=e._self._c;return t("div",[e.canAlterTable?t("div",{staticClass:"design-toolbar"},[t("vsc-button",{attrs:{type:"icon",icon:"codicon-add text-base",title:e.$t("common.new")},on:{click:e.openDialog}}),t("vsc-button",{attrs:{type:"icon",icon:"codicon-refresh text-base",title:e.$t("common.refresh")},on:{click:e.loadData}})],1):e._e(),e.activePanel=="check"?t("ux-grid",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableList,stripe:"",height:e.remainHeight}},[e.canAlterTable?t("ux-table-column",{attrs:{resizable:!0,align:"center",field:"name",title:e.$t("design.constraintName"),"show-overflow-tooltip":"true"}}):e._e(),t("ux-table-column",{attrs:{resizable:!0,align:"center",field:"clause",title:e.$t("design.clause"),"show-overflow-tooltip":"true"}}),e.canAlterTable?t("ux-table-column",{attrs:{title:e.$t("design.operation"),width:"120"},scopedSlots:e._u([{key:"default",fn:function({row:n}){return[t("div",{staticClass:"text-center"},[t("vsc-button",{attrs:{type:"icon",icon:"codicon-remove text-base",title:"delete"},on:{click:function(r){return e.deleteConfirm(n)}}})],1)]}}],null,!1,2569677360)}):e._e()],1):e._e(),t(y,{attrs:{title:e.$t("design.newCheck"),visible:e.status.visible,width:"430px",closeOnClickModal:!1,center:""},on:{"update:visible":function(n){return e.$set(e.status,"visible",n)}}},[t(D,{attrs:{inline:!0,"label-width":"80px","label-position":"left"},nativeOn:{submit:function(n){n.preventDefault()},keyup:function(n){return!n.type.indexOf("key")&&e._k(n.keyCode,"enter",13,n.key,"Enter")?null:e.doCreate.apply(null,arguments)}}},[t(T,{scopedSlots:e._u([{key:"label",fn:function(){return[t("RedMark"),e._v(e._s(e.$t("design.clause"))+" ")]},proxy:!0}])},[t("vsc-input",{staticClass:"!w-[290px]",attrs:{size:"mini",placeholder:"e.g. id >20 and name!='admin'"},model:{value:e.editModel.clause,callback:function(n){e.$set(e.editModel,"clause",n)},expression:"editModel.clause"}})],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("vsc-button",{attrs:{type:"secondary"},on:{click:function(n){e.status.visible=!1}}},[e._v(e._s(e.$t("common.cancel")))]),t("vsc-button",{attrs:{type:"primary",loading:e.status.loading},on:{click:e.doCreate}},[e._v(e._s(e.$t("common.ok")))]),t("br"),e._v(" "),t("br"),t("codemirror",{directives:[{name:"show",rawName:"v-show",value:e.previewSQL,expression:"previewSQL"}],ref:"cmEditor",attrs:{value:e.previewSQL}})],1)],1)],1)},We=[],Ye=S(ke,Ge,We,!1,null,null,null,null);const Ve=Ye.exports;const qe={components:{IndexPanel:Ce,ColumnPanel:ve,InfoPanel:Pe,ForeignKey:Ie,Check:Ve,DDL:Se},mixins:[O],data(){return{remainHeight:0,panels:[{id:"ddl",i18n:"design.ddl",icon:"codicon-edit green"},{id:"column",i18n:"design.column",icon:"codicon-symbol-field blue"},{id:"foreignKey",i18n:"design.foreignKey",icon:"codicon-symbol-class yellow",hidden:()=>!this.supportForignKey},{id:"index",i18n:"design.index",icon:"codicon-github-action purple",hidden:()=>!this.supportIndex},{id:"check",i18n:"design.check",icon:"codicon-tools orange",hidden:()=>!this.supportCheck}],activePanel:"column"}},computed:{...w(M,["canAlterTable","supportForignKey","supportIndex","supportCheck"]),computedPanels(){return this.panels.filter(a=>{var e;return((e=a==null?void 0:a.hidden)==null?void 0:e.call(a))!=!0})}},mounted(){const a=M();this.on("dbType",n=>{a.updateDBType(n)}).on("designMeta",n=>{a.updateFullInfo(n)}).on("success",()=>{F(this.$t("design.updateSuccess"))}).on("error",n=>{g(n)}).init();const e=this.$refs.infoPanel,t=()=>{this.remainHeight=window.innerHeight-50-e.clientHeight};t(),new ResizeObserver(t).observe(e),addEventListener("resize",t)}};var je=function(){var e=this,t=e._self._c;return t("div",{staticClass:"mt-2 design-container"},[t("div",{ref:"infoPanel"},[t("InfoPanel"),t("ul",{staticClass:"tab"},e._l(e.computedPanels,function(n,r){return t("li",{key:r,staticClass:"tab__item",class:{"tab__item--active":e.activePanel==n.id},on:{click:function(o){e.activePanel=n.id}}},[n.icon?t("i",{class:n.icon,staticStyle:{position:"relative",top:"3px"},attrs:{type:"icon"}}):e._e(),e._v(" "+e._s(e.$t(n.i18n))+" ")])}),0)],1),t("div",{staticClass:"mt-2 design-data-container"},[t("ColumnPanel",{directives:[{name:"show",rawName:"v-show",value:e.activePanel=="column",expression:"activePanel=='column'"}],attrs:{remainHeight:e.remainHeight,activePanel:e.activePanel}}),t("ForeignKey",{directives:[{name:"show",rawName:"v-show",value:e.activePanel=="foreignKey",expression:"activePanel=='foreignKey'"}],attrs:{remainHeight:e.remainHeight,activePanel:e.activePanel}}),t("IndexPanel",{directives:[{name:"show",rawName:"v-show",value:e.activePanel=="index",expression:"activePanel=='index'"}],attrs:{remainHeight:e.remainHeight,activePanel:e.activePanel}}),t("Check",{directives:[{name:"show",rawName:"v-show",value:e.activePanel=="check",expression:"activePanel=='check'"}],attrs:{remainHeight:e.remainHeight,activePanel:e.activePanel}}),t("DDL",{directives:[{name:"show",rawName:"v-show",value:e.activePanel=="ddl",expression:"activePanel=='ddl'"}],attrs:{activePanel:e.activePanel}})],1)])},Ke=[],Qe=S(qe,je,Ke,!1,null,"925c3c7f",null,null);const dt=Qe.exports;export{dt as default};
