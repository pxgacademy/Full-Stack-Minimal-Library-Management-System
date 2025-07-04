import myBannerImg from "@/assets/banner-my.jpg";
import { useAppSelector } from "@/redux/hook";
import { selectUser } from "@/redux/features/authSlice";
import LoginAlert from "@/components/LoginAlert";
import type { FC } from "react";
import SectionContainer from "@/components/SectionContainer";

const MyBorrows: FC = () => {
  const user = useAppSelector(selectUser);
  return (
    <SectionContainer img={myBannerImg} sectionTitle="My Borrows">
      {user ? <div></div> : <LoginAlert text="To see your borrows," />}
    </SectionContainer>
  );
};

export default MyBorrows;
