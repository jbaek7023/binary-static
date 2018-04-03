const texts_json = {};
texts_json['VI'] = {"Day":"Ngày","Month":"Tháng","Year":"Năm","Sorry,_an_error_occurred_while_processing_your_request_":"Rất tiếc, đã xảy ra lỗi khi đang xử lý yêu cầu của bạn.","Please_[_1]log_in[_2]_or_[_3]sign_up[_2]_to_view_this_page_":"Xin vui lòng [_1]log in[_2] hoặc [_3]sign up[_2] để xem trang này.","Open_a_Real_Account":"Mở Tài Khoản Thực","Open_a_Financial_Account":"Mở một Tài Khoản Tài Chính","Network_status":"Tình Trạng Mạng","Online":"Trực tuyến","Offline":"Ngoại tuyến","Connecting_to_server":"Đang kết nối với máy chủ","Virtual_Account":"Tài khoản Ảo","Real_Account":"Tài khoản Thực","Investment_Account":"Tài Khoản Đầu Tư","Gaming_Account":"Tài Khoản Cá Cược","Sunday":"Chủ nhật","Monday":"Thứ Hai","Tuesday":"Thứ Ba","Wednesday":"Thứ Tư","Thursday":"Thứ Năm","Friday":"Thứ Sáu","Saturday":"Thứ Bảy","We":"Chúng tôi","Fr":"Thứ 6","January":"Tháng Một","February":"Tháng Hai","March":"Tháng Ba","April":"Tháng 4","May":"Tháng Năm","June":"Tháng Sáu","July":"Tháng Bảy","August":"Tháng 8","September":"Tháng Chín","October":"Tháng Mười","November":"Tháng Mười Một","December":"Tháng 12","Jan":"Tháng Một","Feb":"Tháng Hai","Mar":"Tháng Ba","Apr":"Tháng 4","Jun":"Tháng Sáu","Jul":"Tháng Bảy","Aug":"Tháng 8","Sep":"Tháng Chín","Oct":"Tháng Mười","Nov":"Tháng Mười Một","Dec":"Tháng 12","Next":"Tiếp theo","Previous":"Trước","Hour":"Giờ","Minute":"Phút","Time_is_in_the_wrong_format_":"Thời gian ở sai định dạng.","Start_time":"Thời gian bắt đầu","Entry_spot":"Giá khởi điểm","Purchase_Time":"Thời Gian Mua","Exit_spot":"Giá giao ngay thoát ra","End_time":"Thời Gian Kết Thúc","Sell_time":"Thời gian Bán","Charting_for_this_underlying_is_delayed":"Biểu đồ cho tài sản cơ sở này bị hoãn","year":"năm","month":"tháng","week":"tuần","day":"ngày","days":"ngày","hour":"giờ","hours":"giờ","min":"tối thiểu","minute":"phút","minutes":"phút","second":"giây","seconds":"giây","tick":"giây","ticks":"những điểm thay đổi giá","Loss":"Thua lỗ","Profit":"Lợi nhuận","Payout":"Chi trả","Stake":"Đơn vị vốn, cổ phiếu","Duration":"Khoảng thời gian","End_Time":"Thời Gian Kết Thúc","Net_profit":"Lợi nhuận ròng","Return":"Lợi nhuận","Now":"Hiện tại","Contract_Confirmation":"Xác nhận Hợp đồng","Your_transaction_reference_is":"Tham chiếu giao dịch của bạn là","Rise/Fall":"Tăng/Giảm","Higher/Lower":"Cao hơn/Thấp hơn","In/Out":"Trong/Ngoài","Matches/Differs":"Khớp/Khác nhau","Even/Odd":"Hòa vốn/ Số dư","Over/Under":"Trên/Dưới","Up/Down":"Lên/Xuống","Ends_Between/Ends_Outside":"Kết thúc giữa / kết thúc ngoài","Touch/No_Touch":"Chạm/Không Chạm","Potential_Payout":"Mức Chi Trả Tiềm Năng","Total_Cost":"Tổng Chi phí","Potential_Profit":"Lợi Nhuận Tiềm Năng","View":"Xem","Tick":"Giây","Buy_price":"Giá mua","Final_price":"Giá cuối cùng","Long":"Dài","Short":"Ngắn","Chart":"Biểu đồ","Portfolio":"Hồ sơ","Explanation":"Giải thích","Last_Digit_Stats":"Dữ Liệu Chữ Số Cuối Cùng","Waiting_for_entry_tick_":"Vui lòng đợi cho đến phiên gia nhập.","Waiting_for_exit_tick_":"Vui lòng đợi cho dấu tích thoát.","Please_log_in_":"Vui lòng đăng nhập.","All_markets_are_closed_now__Please_try_again_later_":"Tất cả các thị trường đều đã đóng cửa. Vui lòng thử lại sau.","Account_balance:":"Số Dư Tài Khoản:","Try_our_[_1]Volatility_Indices[_2]_":"Thử [_1]Chỉ Số Biến Động[_2] của chúng tôi.","Try_our_other_markets_":"Hãy thử các thị trường khác.","Session":"Phiên","Fiat_Currency":"Tiền tệ pháp định","High":"Cao","Low":"Thấp","Close":"Đóng","Payoff":"Thưởng phạt","High-Close":"Cao-đóng","Close-Low":"Đóng-Thấp","High-Low":"Cao thấp","Your_account_is_fully_authenticated_and_your_withdrawal_limits_have_been_lifted_":"Tài khoản của bạn được xác thực đầy đủ và mức giới hạn rút tiền của bạn đã được nâng lên.","Your_withdrawal_limit_is_[_1]_[_2]_":"Giới hạn rút tiền của bạn là [_1] [_2].","Your_withdrawal_limit_is_[_1]_[_2]_(or_equivalent_in_other_currency)_":"Giới hạn rút tiền của bạn là [_1] [_2] (hoặc tương đương với đồng tiền khác).","You_have_already_withdrawn_[_1]_[_2]_":"Bạn vừa rút [_1] [_2].","You_have_already_withdrawn_the_equivalent_of_[_1]_[_2]_":"Bạn đã rút số tiền tương đương [_1] [_2].","Therefore_your_current_immediate_maximum_withdrawal_(subject_to_your_account_having_sufficient_funds)_is_[_1]_[_2]_":"Vì vậy khoản tiền rút tối đa hiện giờ của bạn (nói tới tài khoản đang có tiền được rút) là [_1] [_2].","Therefore_your_current_immediate_maximum_withdrawal_(subject_to_your_account_having_sufficient_funds)_is_[_1]_[_2]_(or_equivalent_in_other_currency)_":"Vì vậy khoản tiền rút tối đa hiện giờ của bạn (tài khoản đang có tiền được rút) là [_1] [_2] (hoặc đồng tiền khác có giá trị tương đương).","Your_[_1]_day_withdrawal_limit_is_currently_[_2]_[_3]_(or_equivalent_in_other_currency)_":"Hạn mức rút tiền ngày [_1] của bạn hiện là [_2] [_3] (hoặc tương đương với đồng tiền khác).","You_have_already_withdrawn_the_equivalent_of_[_1]_[_2]_in_aggregate_over_the_last_[_3]_days_":"Bạn đã rút số tiền tương đương với [_1] [_2] trong tổng số hơn [_3] ngày qua.","Contracts_where_the_barrier_is_the_same_as_entry_spot_":"Hợp đồng nơi các giới hạn sẽ giống với giá khởi điểm.","Contracts_where_the_barrier_is_different_from_the_entry_spot_":"Hợp đồng nơi các giới hạn sẽ khác với giá khởi điểm.","ATM":"MÁY ATM","Non-ATM":"Ngoài ATM","Duration_up_to_7_days":"Thời hạn lên đến 7 ngày","Duration_above_7_days":"Thời hạn trên 7 ngày","Major_Pairs":"Cặp tiền tệ lớn","Forex":"Thị trường ngoại hối","This_field_is_required_":"Lĩnh vực này được yêu cầu.","Please_select_the_checkbox_":"Vui lòng chọn hộp đánh dấu.","Please_accept_the_terms_and_conditions_":"Xin vui lòng chấp nhận các điều khoản và điều kiện.","Only_[_1]_are_allowed_":"Chỉ có [_1] được cho phép.","letters":"các ký tự","numbers":"các số","space":"khoảng cách","Sorry,_an_error_occurred_while_processing_your_account_":"Xin lỗi, Lỗi xảy ra trong khi đang xử lý tài khoản của bạn.","Your_changes_have_been_updated_successfully_":"Các thay đổi của bạn đã được cập nhật thành công.","Your_settings_have_been_updated_successfully_":"Thiết lập của bạn đã được cập nhật thành công.","Female":"Nữ","Male":"Nam","Please_select_a_country":"Xin vui lòng chọn quốc gia","Please_confirm_that_all_the_information_above_is_true_and_complete_":"Xin vui lòng xác nhận rằng tất cả các thông tin trên là đúng sự thật và đầy đủ.","Your_token_has_expired_or_is_invalid__Please_click_<a_href=\"[_1]\">here</a>_to_restart_the_verification_process_":"Chuỗi xác nhận của bạn đã hết hiệu lực hoặc hết hạn. Xin vui lòng nhấp chuột vào <a chref=\"[_1]\">đây</a> để khởi động lại quá trình xác minh.","The_email_address_provided_is_already_in_use__If_you_forgot_your_password,_please_try_our_<a_href=\"[_1]\">password_recovery_tool</a>_or_contact_our_customer_service_":"Địa chỉ thư điện tử cung cấp đang được sử dụng. Nếu bạn quên mật khẩu của bạn, hãy thử <a href=\"[_1]\"> công cụ phục hồi mật khẩu của chúng tôi</a> hoặc liên hệ với dịch vụ khách hàng của chúng tôi.","Password_should_have_lower_and_uppercase_letters_with_numbers_":"Mật khẩu nên bao gồm cả chữ hoa, chữ thường và con số.","Password_is_not_strong_enough_":"Mật khẩu không đủ mạnh.","Your_session_duration_limit_will_end_in_[_1]_seconds_":"Giới hạn phiên giao dịch của bạn sẽ kết thúc trong [_1] giây nữa.","Invalid_email_address_":"Địa chỉ email không hợp lệ.","Thank_you_for_signing_up!_Please_check_your_email_to_complete_the_registration_process_":"Cảm ơn bạn đã đăng ký! Vui lòng kiểm tra email của bạn để hoàn tất quá trình đăng ký.","Please_select":"Vui lòng chọn","Minimum_of_[_1]_characters_required_":"Tối thiểu [_1] các kí tự cần thiết.","Please_confirm_that_you_are_not_a_politically_exposed_person_":"Xin vui lòng xác nhận rằng bạn không là một người tiếp xúc với chính trị.","Asset":"Tài sản","Opens":"Mở","Closes":"Kết thúc","Settles":"Quyết toán","Upcoming_Events":"Sự kiện sắp diễn ra","Closes_early_(at_21:00)":"Kết thúc sớm (lúc 21:00)","Closes_early_(at_18:00)":"Kết thúc sớm (lúc 18:00)","New_Year's_Day":"Ngày của năm mới","Christmas_Day":"Lễ Giáng Sinh","Fridays":"Thứ Sáu","today":"hôm nay","today,_Fridays":"hôm nay, Thứ Sáu","Please_select_a_payment_agent":"Vui lòng chọn một đại lý thanh toán","The_Payment_Agent_facility_is_currently_not_available_in_your_country_":"Các cơ sở đại lý thanh toán hiện không có trong đất nước của bạn.","Invalid_amount,_minimum_is":"Số tiền không hợp lệ, tối thiểu là","Invalid_amount,_maximum_is":"Số tiền không hợp lệ, tối đa là","Your_request_to_withdraw_[_1]_[_2]_from_your_account_[_3]_to_Payment_Agent_[_4]_account_has_been_successfully_processed_":"Yêu cầu rút tiền [_1] [_2] từ tài khoản [_3] của bạn và chuyển tới tài khoản Đại lý Thanh toán [_4] đã được xử lý thành công.","Your_token_has_expired_or_is_invalid__Please_click_[_1]here[_2]_to_restart_the_verification_process_":"Chuỗi xác nhận của bạn đã hết hạn. Xin vui lòng nhấp chuột vào [_1]đây[_2] để khởi động lại quá trình xác minh.","New_token_created_":"Token mới đã được tạo.","The_maximum_number_of_tokens_([_1])_has_been_reached_":"Đã đạt đến độ dài tối đa của mã token ([_1]).","Name":"Tên","Token":"Mã Token","Last_Used":"Lần Sử Dụng Gần Đây","Scopes":"Phạm vi","Never_Used":"Chưa bao giờ sử dụng","Delete":"Xóa","Are_you_sure_that_you_want_to_permanently_delete_the_token":"Bạn có chắc chắn muốn xóa vĩnh viễn token","Please_select_at_least_one_scope":"Vui lòng chọn ít nhất một phạm vi","Guide":"Hướng dẫn","Finish":"Kết thúc","Step":"Bước","Select_your_market":"Chọn thị trường của bạn","Select_your_underlying_asset":"Chọn tài sản cơ sở của bạn","Select_your_trade_type":"Chọn loại giao dịch của bạn","Adjust_trade_parameters":"Điều giới hạn giao dịch","Predict_the_direction<br_/>and_purchase":"Dự đoán khuynh hướng<br />và thu mua","Sorry,_this_feature_is_available_to_virtual_accounts_only_":"Rất tiếc, tính năng này chỉ khả dụng với tài khoản tiền ảo.","years":"năm","months":"tháng","weeks":"tuần","Your_changes_have_been_updated_":"Những thay đổi của bạn đã được cập nhật.","Please_enter_an_integer_value":"Vui lòng nhập giá trị số nguyên","Session_duration_limit_cannot_be_more_than_6_weeks_":"Giới hạn thời hạn phiên không thể nhiều hơn 6 tuần.","You_did_not_change_anything_":"Bạn chưa thay đổi bất cứ nội dung nào.","Please_select_a_valid_date_":"Vui lòng chọn một ngày hợp lệ.","Please_select_a_valid_time_":"Vui lòng chọn một thời gian hợp lệ.","Time_out_cannot_be_in_the_past_":"Thời hạn kết thúc không thể tồn tại trong quá khứ.","Time_out_must_be_after_today_":"Thời hạn kết thúc phải sau hôm nay.","Time_out_cannot_be_more_than_6_weeks_":"Thời hạn kết thúc không thể lớn hơn 6 tuần.","Exclude_time_cannot_be_less_than_6_months_":"Thời gian loại trừ không thể ít hơn 6 tháng.","Exclude_time_cannot_be_for_more_than_5_years_":"Thời gian loại trừ không thể nhiều hơn 5 năm.","When_you_click_\"OK\"_you_will_be_excluded_from_trading_on_the_site_until_the_selected_date_":"Khi bạn nhấp vào \"OK\" bạn sẽ bị loại bỏ khỏi giao dịch trên trang web tới ngày được chọn.","Ref_":"Tham khảo.","Resale_not_offered":"Bán lại không được cho phép","Date":"Ngày","Action":"Hành động","Contract":"Hợp đồng","Sale_Date":"Ngày Bán hàng","Sale_Price":"Giá Bán hàng","Total_Profit/Loss":"Tổng Lợi nhuận/Thua lỗ","Your_account_has_no_trading_activity_":"Không có hoạt động giao dịch nào trên tài khoản của bạn.","Today":"Hôm nay","Details":"Chi tiết","Sell":"Bán","Buy":"Mua","Virtual_money_credit_to_account":"Tín dụng tiền ảo cho tài khoản","This_feature_is_not_relevant_to_virtual-money_accounts_":"Đặc điểm này không liên quan tới tài khoản tiền ảo.","Japan":"Nhật Bản","Questions":"Câu hỏi","True":"Đúng","False":"Sai","There_was_some_invalid_character_in_an_input_field_":"Có một vài ký tự không hợp lệ với dữ liệu nhập vào.","Please_follow_the_pattern_3_numbers,_a_dash,_followed_by_4_numbers_":"Vui lòng tuân theo cấu trúc 3 số, dấu gạch ngang, tiếp theo là 4 số.","Score":"Điểm số","{JAPAN_ONLY}Knowledge_Test_Result":"{CHỈ DÀNH CHO THỊ TRƯỜNG NHẬT BẢN}Kết quả Bài Kiểm tra Kiến thức","{JAPAN_ONLY}Please_complete_the_following_questions_":"{CHỈ DÀNH CHO THỊ TRƯỜNG NHẬT BẢN}Vui lòng hoàn thành những câu hỏi sau đây.","You_need_to_finish_all_20_questions_":"Bạn phải hoàn thành toàn bộ 20 câu hỏi.","Weekday":"Ngày trong tuần","Your_Application_is_Being_Processed_":"Ứng dụng của bạn đang được xử lý.","{JAPAN_ONLY}Your_Application_has_Been_Processed__Please_Re-Login_to_Access_Your_Real-Money_Account_":"{CHỈ ĐỐI VỚI NHẬT BẢN} Ứng dụng của bạn đã xử lý. Xin vui lòng đăng nhập lại để truy cập vào tài khoản tiền thực của bạn.","Processing_your_request___":"Đang xử lý yêu cầu của bạn...","Please_check_the_above_form_for_pending_errors_":"Vui lòng kiểm tra các mục nêu trên cho những lỗi đang chờ xử lý.","Asian_Up":"Châu á tăng","Asian_Down":"Châu Á giảm","Digit_Matches":"Số phù hợp","Digit_Differs":"Số khác","Digit_Odd":"Số lẻ","Digit_Even":"Số chẵn","Digit_Over":"Số vượt quá","Digit_Under":"Số dưới","[_1]_[_2]_payout_if_[_3]_is_strictly_higher_than_or_equal_to_Barrier_at_close_on_[_4]_":"[_1] [_2] chi trả nếu [_3] là nghiêm chỉnh cao hơn hoặc bằng Giới Hạn lúc đóng trên [_4].","[_1]_[_2]_payout_if_[_3]_is_strictly_lower_than_Barrier_at_close_on_[_4]_":"[_1] [_2] chi trả nếu [_3] là nghiêm chỉnh thấp hơn so với Giới Hạn lúc đóng trên [_4].","[_1]_[_2]_payout_if_[_3]_does_not_touch_Barrier_through_close_on_[_4]_":"[_1] [_2] thanh toán nếu [_3] không chạm vào Giới Hạn lúc đóng trên [_4].","[_1]_[_2]_payout_if_[_3]_touches_Barrier_through_close_on_[_4]_":"[_1] [_2] chi trả nếu [_3] chạm Giới Hạn lúc đóng trên [_4].","[_1]_[_2]_payout_if_[_3]_ends_on_or_between_low_and_high_values_of_Barrier_at_close_on_[_4]_":"[_1] [_2] chi trả nếu [_3] kết thúc vào hoặc giữa giá trị cao và thấp của các Giới Hạn lúc đóng trên [_4].","[_1]_[_2]_payout_if_[_3]_ends_outside_low_and_high_values_of_Barrier_at_close_on_[_4]_":"[_1] [_2] chi trả nếu [_3] kết thúc bên ngoài giá trị cao và thấp của Giới Hạn lúc đóng trên [_4].","[_1]_[_2]_payout_if_[_3]_stays_between_low_and_high_values_of_Barrier_through_close_on_[_4]_":"[_1] [_2] chi trả nếu [_3] vẫn ở giữa giá trị cao và thấp của Giới Hạn lúc đóng trên [_4].","[_1]_[_2]_payout_if_[_3]_goes_outside_of_low_and_high_values_of_Barrier_through_close_on_[_4]_":"[_1] [_2] chi trả nếu [_3] vượt bên ngoài giá trị thấp và cao của Giới Hạn lúc đóng trên [_4].","D":"Ngày","Higher":"Cao hơn","Higher_or_equal":"Cao hơn hoặc bằng","Lower":"Thấp hơn","Touches":"Chạm","Does_Not_Touch":"Không được chạm","Ends_Between":"Kết thúc giữa","Ends_Outside":"Kết thúc ngoài","Stays_Between":"Nằm giữa","Goes_Outside":"Đi ra ngoài","All_barriers_in_this_trading_window_are_expired":"Tất cả các rào cản trong cửa sổ giao dịch này đã hết hạn","Remaining_time":"Thời gian còn lại","Market_is_closed__Please_try_again_later_":"Thị trường đã đóng cửa. Vui lòng thử lại sau.","This_symbol_is_not_active__Please_try_another_symbol_":"Biểu tượng này là không hoạt động. Hãy thử một biểu tượng khác.","Sorry,_your_account_is_not_authorised_for_any_further_contract_purchases_":"Xin lỗi, tài khoản của bạn không có quyền mua thêm hợp đồng.","Lots":"Các lô","Payout_per_lot_=_1,000":"Thanh toán cho mỗi lô = 1000","Percentage":"Tỷ lệ phần trăm","Digit":"Chữ số","Amount":"Số tiền","Deposit":"Gửi tiền","Withdrawal":"Rút tiền","Your_request_to_transfer_[_1]_[_2]_from_[_3]_to_[_4]_has_been_successfully_processed_":"Yêu cầu chuyển [_1] [_2] từ [_3] sang [_4] đã được xử lý thành công.","Date_and_Time":"Ngày và Thời gian","Browser":"Duyệt tìm","IP_Address":"Địa chỉ IP","Status":"Tình trạng","Successful":"Thành công","Failed":"Thất bại","Your_account_has_no_Login/Logout_activity_":"Không có hoạt động Đăng nhập/Đăng xuất nào trên tài khoản của bạn.","logout":"đăng xuất","Please_enter_a_number_between_[_1]_":"Vui lòng nhập một số giữa [_1].","[_1]_days_[_2]_hours_[_3]_minutes":"[_1] ngày [_2] giờ [_3] phút","Your_trading_statistics_since_[_1]_":"Số liệu thống kê giao dịch của bạn kể từ [_1].","Unlock_Cashier":"Mở khóa Thu ngân","Your_cashier_is_locked_as_per_your_request_-_to_unlock_it,_please_enter_the_password_":"Quỹ đã được khóa theo yêu cầu của bạn - để mở khóa, vui lòng điền mật khẩu.","Lock_Cashier":"Khóa quầy Thu Ngân","An_additional_password_can_be_used_to_restrict_access_to_the_cashier_":"Mật khẩu phụ có thể dùng để hạn chế truy cập vào khu thu ngân.","Update":"Cập nhật","Sorry,_you_have_entered_an_incorrect_cashier_password":"Xin lỗi, bạn đã nhập sai mật khẩu thu ngân","Start_Time":"Thời gian bắt đầu","Entry_Spot":"Giá khởi điểm","Low_Barrier":"Giới Hạn Dưới","Low_Barrier_([_1])":"Giới Hạn Dưới ([_1])","High_Barrier":"Rào cản Cao","High_Barrier_([_1])":"Rào cản Cao ([_1])","Barrier_([_1])":"Giới hạn ([_1])","This_contract_won":"Hợp đồng này đã thắng","This_contract_lost":"Hợp đồng này đã bị lỗ","Spot":"Giao ngay","Barrier":"Giới hạn","Target":"Mục tiêu","Equals":"Tương đương","Not":"Không","Description":"Mô tả","Credit/Debit":"Tín dụng/Ghi nợ","Balance":"Số Dư Tài Khoản","Purchase_Price":"Giá Mua","Profit/Loss":"Lợi nhuận/Thua lỗ","Contract_Information":"Thông tin của Hợp đồng","Contract_Expiry":"Hợp đồng đã hết hạn","Contract_Sold":"Hợp đồng đã được bán","Current":"Tiền tệ","Open":"Mở","Closed":"Đã đóng","Contract_has_not_started_yet":"Hợp đồng chưa được bắt đầu","Price":"Giá","Current_Time":"Thời gian hiện tại","Exit_Spot_Time":"Giá Giao ngay Thoát ra","Exit_Spot":"Giá Giao ngay thoát ra","Indicative":"Chỉ thị","There_was_an_error":"Đã có lỗi xảy ra","Sell_at_market":"Bán tại thị trường","You_have_sold_this_contract_at_[_1]_[_2]":"Bạn đã bán hợp đồng này với mức [_1] [_2]","Your_transaction_reference_number_is_[_1]":"Số tham chiếu giao dịch của bạn là [_1]","Note":"Lưu ý","Contract_will_be_sold_at_the_prevailing_market_price_when_the_request_is_received_by_our_servers__This_price_may_differ_from_the_indicated_price_":"Hợp đồng sẽ được bán ở giá thị trường hiện hành khi máy chủ nhận được yêu cầu. Giá này có thể khác với giá đã được chỉ định.","Contract_ID":"Mã Hợp đồng","Contract_Type":"Loại hợp đồng","Remaining_Time":"Thời gian còn lại","Barrier_Change":"Giới hạn Thay đổi","Audit":"Kiểm toán","Audit_Page":"Kiểm tra trang","View_Chart":"Xem biểu đồ","Contract_Starts":"Hợp đồng bắt đầu","Contract_Ends":"Kết thúc hợp đồng","Start_Time_and_Entry_Spot":"Thời gian bắt đầu và mục nhập điểm","Exit_Time_and_Exit_Spot":"Thời gian xuất cảnh và thoát khỏi chỗ","Please_select_a_value":"Vui lòng chọn một giá trị","You_have_not_granted_access_to_any_applications_":"Bạn không được phép truy cập bất kỳ một ứng dụng nào.","Permissions":"Quyền hạn","Never":"Chưa bao giờ","Revoke_access":"Hủy bỏ truy cập","Are_you_sure_that_you_want_to_permanently_revoke_access_to_the_application":"Bạn có chắc chắn muốn thu hồi quyền truy cập vào ứng dụng vĩnh viễn","Transaction_performed_by_[_1]_(App_ID:_[_2])":"Giao dịch thực hiện bởi [_1] (ID ứng dụng: [_2])","Admin":"Quản trị viên","Read":"Đọc","Payments":"Thanh toán","[_1]_Please_click_the_link_below_to_restart_the_password_recovery_process_":"[_1] xin vui lòng nhấp vào liên kết dưới đây để khởi động lại quá trình phục hồi mật khẩu.","Your_password_has_been_successfully_reset__Please_log_into_your_account_using_your_new_password_":"Mật khẩu của bạn đã được thiết lập lại thành công. Vui lòng dùng mật khẩu mới đăng nhập vào tài khoản của bạn.","Please_check_your_email_for_the_password_reset_link_":"Xin vui lòng kiểm tra email của bạn để biết liên kết mật khẩu đặt lại.","details":"chi tiết","Withdraw":"Rút tiền","Insufficient_balance_":"Số dư tài khoản không đủ.","This_is_a_staging_server_-_For_testing_purposes_only":"Đây là một máy chủ dàn dựng - chỉ cho mục đích chỉ thử nghiệm","The_server_<a_href=\"[_1]\">endpoint</a>_is:_[_2]":"Máy chủ <a href=\"[_1]\">điểm kết thúc</a> là: [_2]","Sorry,_account_signup_is_not_available_in_your_country_":"Xin lỗi, đăng ký tài khoản là không có sẵn ở quốc gia của bạn.","There_was_a_problem_accessing_the_server_":"Có lỗi khi truy cập máy chủ.","There_was_a_problem_accessing_the_server_during_purchase_":"Có lỗi trung cập vào máy chủ khi mua.","Should_be_a_valid_number_":"Nên là một số hợp lệ.","Should_be_more_than_[_1]":"Nên là nhiều hơn so với [_1]","Should_be_less_than_[_1]":"Nên là ít hơn so với [_1]","Should_be_between_[_1]_and_[_2]":"Nên ở giữa [_1] và [_2]","Only_letters,_numbers,_space,_hyphen,_period,_and_apostrophe_are_allowed_":"Chỉ chữ cái, số, khoảng trắng, dấu nối, dấu chấm, và dấu nháy đơn được cho phép.","Only_letters,_space,_hyphen,_period,_and_apostrophe_are_allowed_":"Chỉ chữ cái, khoảng trắng, dấu nối, dấu chấm hết và dấu nháy đơn được cho phép.","Only_letters,_numbers,_and_hyphen_are_allowed_":"Chỉ có chữ cái, số và dấu nối là được phép.","Only_numbers,_space,_and_hyphen_are_allowed_":"Chỉ được phép điền số, khoảng trắng và dấu nối.","Only_numbers_and_spaces_are_allowed_":"Chỉ được phép điền số và khoảng trắng.","Only_letters,_numbers,_space,_and_these_special_characters_are_allowed:_-___'_#_;_:_(_)_,_@_/":"Chỉ chữ cái, số, khoảng trắng, và các ký tự đặc biệt sau là được phép:-. ' # ; : ( ) , @ /","The_two_passwords_that_you_entered_do_not_match_":"Hai mật khẩu bạn vừa nhập không khớp với nhau.","[_1]_and_[_2]_cannot_be_the_same_":"[_1] và [_2] không thể giống nhau.","You_should_enter_[_1]_characters_":"Bạn nên nhập vào [_1] ký tự.","Indicates_required_field":"Biểu thị trường bắt buộc","Verification_code_is_wrong__Please_use_the_link_sent_to_your_email_":"Mã xác minh là sai. Xin vui lòng sử dụng liên kết được gửi tới email của bạn.","The_password_you_entered_is_one_of_the_world's_most_commonly_used_passwords__You_should_not_be_using_this_password_":"Mật khẩu bạn nhập vào là một trong những mật khẩu được sử dụng phổ biến nhất trên thế giới. Bạn không nên sử dụng mật khẩu này.","Hint:_it_would_take_approximately_[_1][_2]_to_crack_this_password_":"Gợi ý: nó sẽ mất khoảng [_1][_2] để crack mật khẩu này.","thousand":"nghìn","million":"triệu","Should_start_with_letter_or_number,_and_may_contain_hyphen_and_underscore_":"Nên bắt đầu bằng chữ hoặc số, và có thể chứa các gạch nối và gạch dưới.","Congratulations!_Your_[_1]_Account_has_been_created_":"Xin chúc mừng! Tài khoản [_1] của bạn đã được tạo.","The_main_password_of_account_number_[_1]_has_been_changed_":"Mật khẩu chính của tài khoản số [_1] đã bị thay đổi.","[_1]_deposit_from_[_2]_to_account_number_[_3]_is_done__Transaction_ID:_[_4]":"tiền gửi [_1] từ [_2] đến tài khoản số [_3] được thực hiện. Giao dịch ID: [_4]","[_1]_withdrawal_from_account_number_[_2]_to_[_3]_is_done__Transaction_ID:_[_4]":"% 1 rút khỏi số tài khoản% 2 đến% 3 được thực hiện. ID giao dịch:% 4","Your_cashier_is_locked_as_per_your_request_-_to_unlock_it,_please_click_<a_href=\"[_1]\">here</a>_":"Quỹ đã bị khóa theo yêu cầu của bạn - để mở khóa, vui lòng nhấn <a href=\"[_1]\">vào đây </a>.","Sorry,_this_feature_is_not_available_in_your_jurisdiction_":"Xin lỗi, tính năng này là không có sẵn trong thẩm quyền của bạn.","Main_password":"Mật khẩu chính","Investor_password":"Mật khẩu của chủ đầu tư","Current_password":"Mật khẩu hiện tại","New_password":"Mật khẩu mới","Demo_Standard":"Giới thiệu tiêu chuẩn","Demo_Advanced":"Demo nâng cao","Advanced":"Nâng cao","Demo_Volatility_Indices":"Chỉ Số Biến Động Demo","Real_Standard":"Tiêu chuẩn thực","Real_Volatility_Indices":"Chỉ Số Biến Động Thực","Change_Password":"Thay Đổi Mật Khẩu","Demo_Accounts":"Tài khoản demo","Our_MT5_service_is_currently_unavailable_to_EU_residents_due_to_pending_regulatory_approval_":"Dịch vụ MT5 của chúng tôi hiện không có sẵn cho cư dân EU do đang chờ phê duyệt quy định.","[_1]_Account_[_2]":"[_1] tài khoản [_2]","Min":"Tối thiểu","Max":"Tối đa","Current_balance":"Số dư hiện tại","Withdrawal_limit":"Giới hạn rút tiền","[_1]Authenticate_your_account[_2]_now_to_take_full_advantage_of_all_payment_methods_available_":"[_1] Xác thực tài khoản [_2] của bạn bây giờ để tận dụng đầy đủ của tất cả các phương thức thanh toán có sẵn.","Please_set_the_[_1]currency[_2]_of_your_account_":"Vui lòng đặt [_1]tiền tệ[_2] của tài khoản bạn.","Please_set_your_30-day_turnover_limit_in_our_[_1]self-exclusion_facilities[_2]_to_remove_deposit_limits_":"Xin vui lòng thiết lập giới hạn 30 ngày doanh thu của bạn trong [_1]công cụ tự loại trừ[_2] của chúng tôi để loại bỏ giới hạn tiền gửi.","Please_set_[_1]country_of_residence[_2]_before_upgrading_to_a_real-money_account_":"Xin vui lòng thiết lập [_1]quốc gia cư trú[_2] trước khi nâng cấp lên tài khoản tiền thật.","Please_complete_the_[_1]financial_assessment_form[_2]_to_lift_your_withdrawal_and_trading_limits_":"Xin vui lòng hoàn tất mẫu đánh giá tài chính [_1] [_2] để nâng rút tiền của bạn và kinh doanh các giới hạn.","Please_[_1]complete_your_account_profile[_2]_to_lift_your_withdrawal_and_trading_limits_":"Xin [_1] vui lòng hoàn thành hồ sơ tài khoản [_2] của bạn để nâng mức rút tiền và các giới hạn giao dịch.","Please_[_1]accept_the_updated_Terms_and_Conditions[_2]_to_lift_your_withdrawal_and_trading_limits_":"Xin [_1] vui lòng chấp nhận cập nhật các Điều Khoản và Điều Kiện [_2] để nâng mức tiền rút và giới hạn giao dịch.","Your_account_is_restricted__Kindly_[_1]contact_customer_support[_2]_for_assistance_":"Tài khoản của bạn bị hạn chế. [_1] vui lòng liên hệ hỗ trợ khách hàng [_2] để được hỗ trợ.","Connection_error:_Please_check_your_internet_connection_":"Lỗi kết nối: xin vui lòng kiểm tra kết nối internet của bạn.","You_have_reached_the_rate_limit_of_requests_per_second__Please_try_later_":"Bạn đã đạt đến giới hạn số lượng lệnh có thể mỗi giây. Xin vui lòng thử lại sau.","[_1]_requires_your_browser's_web_storage_to_be_enabled_in_order_to_function_properly__Please_enable_it_or_exit_private_browsing_mode_":"[_1] yêu cầu lưu trữ web của trình duyệt của bạn để được kích hoạt để hoạt động đúng. Xin vui lòng cho phép nó hoặc thoát ra khỏi chế độ duyệt web riêng tư.","We_are_reviewing_your_documents__For_more_details_[_1]contact_us[_2]_":"Chúng tôi đang xem xét các tài liệu của bạn. Để biết thêm chi tiết [_1]contact us[_2].","Your_web_browser_([_1])_is_out_of_date_and_may_affect_your_trading_experience__Proceed_at_your_own_risk__[_2]Update_browser[_3]":"Trình duyệt web của bạn ([_1]) hết hạn và có thể ảnh hưởng đến kinh nghiệm kinh doanh của bạn. Tiến hành rủi ro của riêng bạn. [_2]Update browser[_3]","Bid":"Giá thầu","Closed_Bid":"Đóng thầu","Create":"Tạo","Commodities":"Hàng hóa","Indices":"Chỉ số","Stocks":"Cổ phiếu","Volatility_Indices":"Chỉ số Biến động","Set_Currency":"Thiết lập tiền tệ","Please_choose_a_currency":"Hãy chọn một loại tiền tệ","Create_Account":"Tạo Tài Khoản","Accounts_List":"Danh sách tài khoản","[_1]_Account":"[_1] tài khoản","Investment":"Sự đầu tư","Gaming":"Chơi Game","Virtual":"Ảo","Real":"Thực tế","This_account_is_disabled":"Tài khoản này bị vô hiệu hoá","This_account_is_excluded_until_[_1]":"Tài khoản này bị loại trừ cho đến khi [_1]","Bitcoin_Cash":"Bitcoin tiền mặt","Invalid_document_format:_\"[_1]\"":"Định dạng tài liệu không hợp lệ: \"[_1]\"","File_([_1])_size_exceeds_the_permitted_limit__Maximum_allowed_file_size:_3MB":"Kích thước tập tin ([_1]) vượt quá giới hạn cho phép. kích thước tập tin tối đa cho phép: 3MB","ID_number_is_required_for_[_1]_":"Số ID là cần thiết cho [_1].","Only_letters,_numbers,_space,_underscore,_and_hyphen_are_allowed_for_ID_number_":"Chỉ chữ cái, số, khoảng trắng, gạch ngang dưới và dấu nối được cho phép đối với số ID.","Expiry_date_is_required_for_[_1]_":"Hạn sử dụng cần thiết cho [_1].","Passport":"Hộ chiếu","ID_card":"ID thẻ","Driving_licence":"Giấy phép lái xe","Front_Side":"Mặt trước","Reverse_Side":"Đảo ngược bên","Front_and_reverse_side_photos_of_[_1]_are_required_":"[_1] yêu cầu phải có ảnh mặt trước và mặt sau của chứng minh thư.","[_1]Your_Proof_of_Identity_or_Proof_of_Address[_2]_did_not_meet_our_requirements__Please_check_your_email_for_further_instructions_":"[_1]Chứng minh danh tính của bạn hoặc chứng minh địa chỉ của bạn[_2] không đáp ứng yêu cầu của chúng tôi. Vui lòng kiểm tra email của bạn để được hướng dẫn thêm.","Following_file(s)_were_already_uploaded:_[_1]":"(Các) tệp sau đây đã được tải lên: [_1]"};