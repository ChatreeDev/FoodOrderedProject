package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("sa-65.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema
	database.AutoMigrate(
		&User{},
		&Booking{},
		&FoodPaymentType{},
		&FoodSet{},
		&FoodOrderedFoodSet{},
		&FoodOrdered{},
	)

	db = database

	//Underscore ซ่อน err อยู่ เนื่องจากเราไม่ได้ใช้ (ไม่งั้นมันจะขึ้นแจ้งเตือนสีเหลือง) go ตัวแปรที่เขียนขึ้นมันต้องเอาไปใช้อะ
	password, _ := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	//ใส่ Data ยังไม่ครบ
	db.Model(&User{}).Create(&User{
		FirstName: "Chatree",
		LastName:  "Nernplab",
		Email:     "chatree@gmail.com",
		Password:  string(password),
	})
	db.Model(&User{}).Create(&User{
		FirstName: "Firstname",
		LastName:  "Lastname",
		Email:     "name@example.com",
		Password:  string(password),
	})

	var chatree User
	var name User
	db.Raw("SELECT * FROM users WHERE email = ?", "chatree@gmail.com").Scan(&chatree)
	db.Raw("SELECT * FROM users WHERE email = ?", "name@example.com").Scan(&name)

	// --- FoodSet Data
	SnackBox := FoodSet{
		Name:   "Snack Box",
		Detail: "Classic Bakery and Chabaa",
		Price:  35,
	}
	db.Model(&FoodSet{}).Create(&SnackBox)

	CoffeeBreak := FoodSet{
		Name:   "Coffee Break",
		Detail: "Bakery, Nescafe and Coffeemate",
		Price:  40,
	}
	db.Model(&FoodSet{}).Create(&CoffeeBreak)

	PremiumBakery := FoodSet{
		Name:   "Premium Bakery",
		Detail: "Premium Bakery, Classic Bakery and Chabaa",
		Price:  65,
	}
	db.Model(&FoodSet{}).Create(&PremiumBakery)

	// FoodPaymentType Data
	PromptPay := FoodPaymentType{
		Name: "Prompt Pay",
	}
	db.Model(&FoodPaymentType{}).Create(&PromptPay)

	BankTransfer := FoodPaymentType{
		Name: "Bank transfer",
	}
	db.Model(&FoodPaymentType{}).Create(&BankTransfer)

	Cash := FoodPaymentType{
		Name: "Cash",
	}
	db.Model(&FoodPaymentType{}).Create(&Cash)

	//เหลือ Data ของ Booking ใส่ไม่เป็นอะ
	Booking1 := Booking{
		Room:             "2001",
		BookingTimeStart: time.Now(),
		BookingTimeStop:  time.Now().Add(time.Hour * 3),
		Member:           chatree,
	}
	db.Model(&Booking{}).Create(&Booking1)

	//Data ต้องใส่ Usage มั้ย
	Booking2 := Booking{
		Room:             "2002",
		BookingTimeStart: time.Now(),
		BookingTimeStop:  time.Now().Add(time.Hour * 3),
		Member:           name,
	}
	db.Model(&Booking{}).Create(&Booking2)

	FoodOrderedFoodSet1 := FoodOrderedFoodSet{
		FoodSet:  SnackBox,
		Quantity: 2,
	}
	FoodOrderedFoodSet2 := FoodOrderedFoodSet{
		FoodSet:  CoffeeBreak,
		Quantity: 1,
	}
	FoodOrderedFoodSet3 := FoodOrderedFoodSet{
		FoodSet:  PremiumBakery,
		Quantity: 3,
	}

	// FoodOrdered Data
	Ordered1 := FoodOrdered{
		Booking:         Booking1,
		FoodPaymentType: PromptPay,
		FoodTime:        time.Now(),
		TotalPrice:      305,
		FoodOrderedFoodSets: []FoodOrderedFoodSet{
			FoodOrderedFoodSet1, FoodOrderedFoodSet2, FoodOrderedFoodSet3,
		},
	}
	db.Model(&FoodOrdered{}).Create(&Ordered1)

}
