```sql
ALTER TABLE `installation_service_test2`.`order` DROP COLUMN `notes`, ADD COLUMN `remarks` TEXT NOT NULL AFTER `date`, ADD COLUMN `comments` TEXT NOT NULL AFTER `remarks`;
```