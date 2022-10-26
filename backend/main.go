package main

/*	ก่อนลบ DB กรุณไป close DB ใน DB Browser ก่อน
 */

import (
	"github.com/ChatreeDev/sa-65-example/controller"
	"github.com/ChatreeDev/sa-65-example/middlewares"

	"github.com/ChatreeDev/sa-65-example/entity"

	"github.com/gin-gonic/gin"
)

// พยายามดูชื่อฟังก์ชันให้มันตรง (ย้ำนะแค่ชื่อฟังก์ชัน ส่วน path เราเป็นคนตั้งเองซึ่งมันอยู่คอมเมนต์ของไฟล์ [booking.go] ใน controller)
func main() {

	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	/* เป็นการกำหนด path โดยมันจะเริ่มเรียกที่ local host จากนั้นก็ไปที่ user
	แล้วไปเรียก method GET แล้วค่อยทำการ ListUser ที่เป็นตัว controller
	*/
	api := r.Group("/")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			// User Routes
			protected.GET("/users", controller.ListUsers)
			protected.GET("/user/:id", controller.GetUser)
			protected.POST("/users", controller.CreateUser)
			protected.PATCH("/users", controller.UpdateUser)
			protected.DELETE("/users/:id", controller.DeleteUser)

			// Booking Routes
			protected.GET("/bookings", controller.ListBookings)
			protected.GET("/booking/:id", controller.GetBooking)
			// protected.POST("/bookings", controller.CreateBooking)

			// Food set Routes
			protected.GET("/foodsets", controller.ListFoodSets)
			protected.GET("/foodset/:id", controller.GetFoodSet)
			protected.POST("/foodsets", controller.CreateFoodSet)
			// protected.PATCH("/foodsets", controller.UpdateFoodSet)
			// protected.DELETE("/foodsets/:id", controller.DeleteFoodSet)

			// Food payment type Routes
			protected.GET("/foodpayment_types", controller.ListFoodPaymentTypes)
			protected.GET("/foodpayment_type/:id", controller.GetFoodPaymentType)
			protected.POST("/foodpayment_types", controller.CreateFoodPaymentType)
			// protected.PATCH("/foodpayment_types", controller.UpdateFoodPaymentType)
			// protected.DELETE("/foodpayment_types/:id", controller.DeleteFoodPaymentType)

			// Food ordered Routes
			protected.GET("/foodordereds", controller.ListFoodOrdereds)
			protected.GET("/foodordered/:id", controller.GetFoodOrdered)
			protected.POST("/foodordereds", controller.CreateFoodOrdered)
			// protected.PATCH("/users", controller.UpdateUser)
			// protected.DELETE("/users/:id", controller.DeleteUser
		}
	}

	r.POST("/login", controller.Login)

	// Run the server
	r.Run()

}
func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return

		}

		c.Next()

	}

}
