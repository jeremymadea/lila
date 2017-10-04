package lila.common.implicits

import java.util.Base64
import scala.util.Try

final class PimpedTryList[A](private val list: List[Try[A]]) extends AnyVal {
  def sequence: Try[List[A]] = Try(list map { _.get })
}

final class PimpedList[A](private val list: List[A]) extends AnyVal {
  def sortLike[B](other: List[B], f: A => B): List[A] = list.sortWith {
    (x, y) => other.indexOf(f(x)) < other.indexOf(f(y))
  }
}

final class PimpedSeq[A](private val seq: Seq[A]) extends AnyVal {
  def has(a: A) = seq contains a
}

final class PimpedByteArray(private val self: Array[Byte]) extends AnyVal {
  def toBase64 = Base64.getEncoder.encodeToString(self)
}